import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { MoistureService } from 'src/moisture/moisture.service';
import { differenceInMinutes } from 'date-fns';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  DeviceDto,
  IChangeDeviceUserData,
  ICreateDeviceData,
  IDeviceListReqData,
  IDeviceListResponse
} from "./device.schema";
import { ApiBearerAuth, ApiResponse} from "@nestjs/swagger";
import { AuthService } from "../auth/auth.service";

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService,
              private authService: AuthService,
              private readonly moistureService: MoistureService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBearerAuth()
  async setDevice(@Body() device: ICreateDeviceData, @Req() req, @Res() res): Promise<void> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const deviceToCreate = {
      deviceId: device.deviceId,
      user: authenticatedUserEmail,
      isOnline: false,
      isPumpRunning: false,
      temperature: 0,
      moisture: 0,
      isMoistureThresholdEnabled: false,
      minMoistureThreshold: 0,
      maxMoistureThreshold: 0,
      waterLevel: 0
    };
    try {
      await this.devicesService.create(deviceToCreate);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(409);
    }
  }

  @Post('update')
  async updateDevice(@Body() device: DeviceDto): Promise<void> {
    const deviceToChange = await this.devicesService.findOne({deviceId: device.deviceId});
    const deviceToUpdate = {
      ...device,
      user: deviceToChange.user,
    };
    await this.devicesService.update(deviceToUpdate);
    const lastMoistureReport = await this.moistureService.getLatest({deviceId: device.deviceId});
    // if there is a report, add one once in 4 mins, otherwise create moisture report
    if (lastMoistureReport) {
      const lastActivityDate = lastMoistureReport.date;
      if (differenceInMinutes(new Date(), new Date(lastActivityDate)) > 4) {
        this.addMoisture(deviceToUpdate);
      }
    } else {
      this.addMoisture(deviceToUpdate);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('changeUser')
  async updateDeviceUser(@Body() data: IChangeDeviceUserData, @Req() req, @Res() res): Promise<void> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const deviceToChange = await this.devicesService.findOne({deviceId: data.deviceId});
    if (!deviceToChange) {
      res.sendStatus(404);
      return;
    }
    const deviceToUpdate = {
      ...JSON.parse(JSON.stringify(deviceToChange)),
      user: data.user,
    };
    if (!deviceToChange) {
      res.sendStatus(404);
      return;
    }
    if (deviceToChange.user !== authenticatedUserEmail) {
      res.sendStatus(401);
    } else {
      await this.devicesService.update(deviceToUpdate);
      res.sendStatus(200);
    }
  }

  // todo: deprecate
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DeviceDto, isArray: true })
  async getDeviceList(@Req() req): Promise<DeviceDto[]> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const allDevices = await this.devicesService.findAll(authenticatedUserEmail);
    await this.checkOnlineStatus(allDevices);
    return await this.devicesService.findAll(authenticatedUserEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Post('list2')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: IDeviceListResponse, isArray: true })
  async getFilteredDeviceList(@Body() deviceData: IDeviceListReqData, @Req() req): Promise<IDeviceListResponse> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const allDevices = await this.devicesService.getFilteredList({user: authenticatedUserEmail}, deviceData.filters.paging);
    await this.checkOnlineStatus(allDevices);
    const data = await this.devicesService.getFilteredList({user: authenticatedUserEmail}, deviceData.filters.paging);
    const allItems = await this.devicesService.findAll(authenticatedUserEmail);
    return {
      items: data,
      total: allItems.length
    }
  }
  // todo: uncomment when login will be implemented on device side
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DeviceDto })
  async deleteDevice(@Param() params, @Req() req, @Res() res): Promise<void> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const device = await this.devicesService.findOne({deviceId: params.id});
    if (!device) {
      res.sendStatus(404);
      return;
    }
    if (device.user !== authenticatedUserEmail) {
      res.sendStatus(401);
    } else {
      this.checkOnlineStatus([device]);
      const deviceToSend = await this.devicesService.findOne({deviceId: params.id});
      res.json(deviceToSend);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  async getDeviceById(@Param() params, @Req() req, @Res() res): Promise<void> {
    const authenticatedUserEmail = this.authService.getUserFromToken(req);
    const device = await this.devicesService.findOne({deviceId: params.id});
    if (!device) {
      res.sendStatus(404);
      return;
    }
    if (device.user !== authenticatedUserEmail) {
      res.sendStatus(401);
    } else {
      this.devicesService.delete({deviceId: params.id});
      res.sendStatus(204);
    }
  }

  private async checkOnlineStatus(devices: DeviceDto[]) {
    const promisesArray= [];
    for (const device of devices) {
      promisesArray.push(
        new Promise(async (resolve) => {
          const lastMoistureReport = await this.moistureService.getLatest({deviceId: device.deviceId, date: { $exists: true }});
          if (lastMoistureReport) {
            const lastActivityDate = lastMoistureReport.date;
            if (differenceInMinutes(new Date(), new Date(lastActivityDate)) > 5) {
              this.devicesService.update({
                deviceId: device.deviceId,
                isOnline: false
              });
            } else {
              this.devicesService.update({
                deviceId: device.deviceId,
                isOnline: true
              });
            }
          } else {
            this.devicesService.update({
              deviceId: device.deviceId,
              isOnline: false
            });
          }
          resolve();
        })
      );
    }
    await Promise.all(promisesArray);
  };

  private addMoisture (device: DeviceDto) {
    if (device.moisture) {
      this.moistureService.create({
        moisture: device.moisture,
        deviceId: device.deviceId,
        date: new Date()
      });
    }
  }
}

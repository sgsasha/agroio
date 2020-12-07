import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { MoistureService } from 'src/moisture/moisture.service';
import { differenceInMinutes } from 'date-fns';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeviceDto } from "./device.schema";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiResponse } from "@nestjs/swagger";

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService,
              private readonly moistureService: MoistureService) {}

  @ApiExcludeEndpoint()
  @Post('set')
  async setDevice(@Body() device: DeviceDto): Promise<void> {
    await this.devicesService.create(device);
  }

  @ApiExcludeEndpoint()
  @Post('update')
  async updateDevice(@Body() device: DeviceDto): Promise<void> {
    await this.devicesService.update(device);
    const lastMoistureReport = await this.moistureService.getLatest({deviceId: device.deviceId});
    // if there is a report, add one once in 4 mins, otherwise create moisture report
    if (lastMoistureReport) {
      const lastActivityDate = lastMoistureReport.date;
      if (differenceInMinutes(new Date(), new Date(lastActivityDate)) > 4) {
        this.addMoisture(device);
      }
    } else {
      this.addMoisture(device);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DeviceDto, isArray: true })
  async getDeviceList(): Promise<DeviceDto[]> {
    const allDevices = await this.devicesService.findAll();
    await this.checkOnlineStatus(allDevices);
    return await this.devicesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DeviceDto })
  async getDeviceById(@Param() params): Promise<DeviceDto> {
    const device = await this.devicesService.findOne({deviceId: params.id});
    this.checkOnlineStatus([device]);
    return await this.devicesService.findOne({deviceId: params.id});
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

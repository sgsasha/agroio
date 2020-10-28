import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Request } from 'express';
import { MoistureService } from 'src/moisture/moisture.service';
import { differenceInMinutes } from 'date-fns';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService,
              private readonly moistureService: MoistureService) {}

  @Post('set')
  setDevice(@Req() req: Request) {
    this.devicesService.create(req.body);
  }

  @Post('update')
  updateDevice(@Req() req: Request) {
    this.devicesService.update(req.body);
    if (req.body.moisture) {
      this.moistureService.create(req.body);
    }
  }

  @Get('list')
  async getDeviceList(): Promise<IDevice[]> {
    const allDevices = await this.devicesService.findAll();
    await this.checkOnlineStatus(allDevices);
    return await this.devicesService.findAll();
  }

  @Get(':id')
  async getDeviceById(@Param() params): Promise<IDevice> {
    const device = await this.devicesService.findOne({deviceId: params.id});
    this.checkOnlineStatus([device]);
    return await this.devicesService.findOne({deviceId: params.id});
  }

  private async checkOnlineStatus(devices: IDevice[]) {
    const promisesArray= [];
    devices.forEach(async (device) => {
      promisesArray.push(
        new Promise(async (resolve) => {
          const lastMoistureReport = await this.moistureService.getLatest({deviceId: device.deviceId});
          const lastActivityDate = lastMoistureReport.date;
          if (differenceInMinutes(new Date(), new Date(lastActivityDate)) > 5) {
            this.devicesService.update({
              deviceId: device.deviceId,
              isOnline: false
            });
            resolve();
          } else {
            this.devicesService.update({
              deviceId: device.deviceId,
              isOnline: true
            });
            resolve();
          }
        })
      );
    });
    await Promise.all(promisesArray);
  };
}

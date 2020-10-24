import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MoistureService } from './moisture.service';
import { Request, Response } from 'express';
import { DevicesService } from 'src/devices/devices.service';

@Controller('moisture')
export class MoistureController {
  constructor(private readonly moistureService: MoistureService,
              private readonly devicesService: DevicesService) {}

  @Post('set')
  async setMoisture(@Req() req: Request): Promise<void> {
    const moisture = req.body.moisture < 0 ? 0 : req.body.moisture;
    const payload: IMoistureData = {
      moisture: moisture,
      deviceId: req.body.deviceId,
      date: new Date()
    }
    this.moistureService.create(payload);
    this.devicesService.update({
      deviceId: req.body.deviceId,
      moisture: moisture
    });
    const deviceData = await this.devicesService.findOne({deviceId: req.body.deviceId});
    if (moisture <= deviceData.moistureThreshold) {
      this.devicesService.update({
        deviceId: req.body.deviceId,
        isPumpRunning: true
      })
    } else {
      this.devicesService.update({
        deviceId: req.body.deviceId,
        isPumpRunning: false
      })
    }
  }

  @Get()
  async getLatestMoisture(): Promise<IMoistureData> {
    const list = await this.moistureService.getLatest();
    return list[0];
  }

  @Get(':id')
  async getMoistureList(@Param() params): Promise<IMoistureData[]> {
    return await this.moistureService.findAll({deviceId: params.id});
  }
}

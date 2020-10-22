import { Controller, Get, Post, Req } from '@nestjs/common';
import { MoistureService } from './moisture.service';
import { Request, Response } from 'express';

@Controller('moisture')
export class MoistureController {
  constructor(private readonly moistureService: MoistureService) {}

  @Post('set')
  setTemperature(@Req() req: Request): void {
    console.log(req.body.moisture);
    const payload: IMoistureData = {
      moisture: req.body.moisture < 0 ? 0 : req.body.moisture,
      deviceId: req.body.deviceId,
      date: new Date()
    }
    this.moistureService.create(payload);
  }

  @Get()
  async getLatestMoisture(): Promise<IMoistureData> {
    const list = await this.moistureService.getLatest();
    return list[0];
  }

  @Get('list')
  async getMoistureList(): Promise<IMoistureData[]> {
    return await this.moistureService.findAll();
  }
}

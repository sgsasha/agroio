import { Controller, Get, Post, Req } from '@nestjs/common';
import { MoistureService } from './moisture.service';
import { Request, Response } from 'express';

@Controller('moisture')
export class MoistureController {
  public temperature: number = 0;
  constructor(private readonly moistureService: MoistureService) {}

  @Post('set')
  setTemperature(@Req() req: Request): void {
    console.log(req.body.moisture);
    this.temperature = req.body.moisture;
    const payload: IMoistureData = {
      moisture: req.body.moisture,
      date: new Date()
    }
    this.moistureService.create(payload);
  }

  @Get()
  async getTemperature(): Promise<ITemperatureData> {
    const list = await this.moistureService.getLatest();
    return list[0];
  }

  @Get('list')
  async  getTemperatureList(): Promise<ITemperatureData[]> {
    return await this.moistureService.findAll();
  }
}

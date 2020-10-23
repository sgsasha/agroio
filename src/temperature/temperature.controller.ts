import { Controller, Post, Req, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
  public temperature: number = 0;
  constructor(private readonly temperatureService: TemperatureService) {}

  @Post('set')
  setTemperature(@Req() req: Request): void {
    console.log(req.body.temperature);
    this.temperature = req.body.temperature;
    const payload: ITemperatureData = {
      temperature: req.body.temperature,
      deviceId: req.body.deviceId,
      date: new Date()
    }
    this.temperatureService.create(payload);
  }

  @Get()
  async getTemperature(): Promise<ITemperatureData> {
    const list =  await this.temperatureService.getLatest();
    return list[0];
  }

  @Get(':id')
  async getTemperatureList(@Param() params): Promise<ITemperatureData[]> {
    return await this.temperatureService.findAll({deviceId: params.id});
  }
}

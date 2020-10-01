import { Controller, Post, Req, Get } from '@nestjs/common';
import { Request } from 'express';
interface IWeatherData {
  temperature: number,
  // format: string,
  // timestamp: Date
}
// TODO: connect mongodb and fetch data from/to it
@Controller('temperature')
export class TemperatureController {
  public temperature: number = 0;

  @Post('setTemperature')
  setTemperature(@Req() req: Request): void {
    console.log(req.body);
  }

  @Get()
  getTemperature(): number {
    return this.temperature;
  }
}

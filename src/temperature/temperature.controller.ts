import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
interface IWeatherData {
  temperature: number,
  // format: string,
  // timestamp: Date
}
@Controller('temperature')
export class TemperatureController {
  @Post('setTemperature')
  setTemperature(@Req() req: Request): void {
    console.log(req.body);
  }
}

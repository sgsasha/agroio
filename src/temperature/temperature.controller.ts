import { Controller, Post, Req, Get, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
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
    this.temperature = req.body.temperature;
  }

  @Get()
  getTemperature(@Res() res: Response): any {
    // return this.temperature;
    res.status(HttpStatus.OK).json({temperature: this.temperature});
  }
}

import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Request } from 'express';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('set')
  setTemperature(@Req() req: Request) {
    this.devicesService.create(req.body);
  }

  @Get('list')
  async getMoistureList(): Promise<IDevice[]> {
    return await this.devicesService.findAll();
  }

  @Get(':id')
  async getDeviceById(@Param() params): Promise<IDevice> {
    return await this.devicesService.findOne({deviceId: params.id});
  }
}

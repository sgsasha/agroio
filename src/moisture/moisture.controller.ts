import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MoistureService } from './moisture.service';
import { Request } from 'express';
import { DevicesService } from 'src/devices/devices.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiResponse } from "@nestjs/swagger";
import { MoistureDto, MoistureRequestDto } from "./moisture.schema";

@Controller('moisture')
export class MoistureController {
  constructor(private readonly moistureService: MoistureService,
              private readonly devicesService: DevicesService) {}

  @ApiExcludeEndpoint()
  @Post('set')
  async setMoisture(@Req() req: Request): Promise<void> {
    const moisture = req.body.moisture < 0 ? 0 : req.body.moisture;
    const payload: IMoistureData = {
      moisture: moisture,
      deviceId: req.body.deviceId,
      date: new Date()
    };
    await this.moistureService.create(payload);
    await this.devicesService.update({
      deviceId: req.body.deviceId,
      moisture: moisture
    });
    const deviceData = await this.devicesService.findOne({deviceId: req.body.deviceId});
    if (deviceData.isMoistureThresholdEnabled) {
      if (moisture <= deviceData.minMoistureThreshold) {
        this.devicesService.update({
          deviceId: req.body.deviceId,
          isPumpRunning: true
        })
      }
      if (moisture >= deviceData.maxMoistureThreshold) {
        this.devicesService.update({
          deviceId: req.body.deviceId,
          isPumpRunning: false
        })
      }
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MoistureDto })
  async getMoistureList(@Param() params): Promise<IMoistureData[]> {
    return await this.moistureService.findAll({deviceId: params.id});
  }

  @Post('list')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MoistureDto, isArray: true })
  async getFilteredMoistureList(@Body() data: MoistureRequestDto): Promise<IMoistureData[]> {
    const query = this.moistureService.getFilterQuery(data);
    return await this.moistureService.findAll(query);
  }
}

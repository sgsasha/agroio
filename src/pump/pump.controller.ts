import { Controller, Post, Req, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { Request } from 'express';
import { PumpService } from './pump.service';

@Controller('pumpStatus')
export class PumpController {
  constructor(private readonly pumpService: PumpService) {}
  
  @Post('update')
  async setPumpStatus(@Req() req: Request): Promise<void> {
    return await this.pumpService.create(req.body);
  }

  @Get(':id')
  async getPumpStatus(@Param() params) {
    return await this.pumpService.getDevicePumpStatus(params.id);
  }
}

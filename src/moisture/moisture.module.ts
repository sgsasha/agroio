import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/devices/device.schema';
import { DevicesService } from 'src/devices/devices.service';
import { MoistureController } from './moisture.controller';
import { MoistureSchema } from './moisture.schema';
import { MoistureService } from './moisture.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Moisture', schema: MoistureSchema },
      { name: 'Device', schema: DeviceSchema }
    ]),
  ],
  controllers: [
    MoistureController
  ],
  providers: [
    MoistureService,
    DevicesService,
  ]
})
export class MoistureModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoistureSchema } from 'src/moisture/moisture.schema';
import { MoistureService } from 'src/moisture/moisture.service';
import { DeviceSchema } from './device.schema';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Moisture', schema: MoistureSchema },
      { name: 'Device', schema: DeviceSchema }
    ]),
    AuthModule
  ],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    MoistureService
  ]
})
export class DevicesModule {}

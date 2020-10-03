import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureController } from './temperature.controller';
import { TemperatureSchema } from './temperature.schema';
import { TemperatureService } from './temperature.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Temperature', schema: TemperatureSchema }])
  ],
  controllers: [
    TemperatureController
  ],
  providers: [
    TemperatureService
  ]
})
export class TemperatureModule {}
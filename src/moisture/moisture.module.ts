import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoistureController } from './moisture.controller';
import { MoistureSchema } from './moisture.schema';
import { MoistureService } from './moisture.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Moisture', schema: MoistureSchema }])
  ],
  controllers: [
    MoistureController
  ],
  providers: [
    MoistureService
  ]
})
export class MoistureModule {}
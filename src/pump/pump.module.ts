import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PumpController } from './pump.controller';
import { PumpStatusSchema } from './pump.schema';
import { PumpService } from './pump.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PumpStatus', schema: PumpStatusSchema }])
  ],
  controllers: [
    PumpController
  ],
  providers: [
    PumpService
  ]
})
export class PumpModule {}
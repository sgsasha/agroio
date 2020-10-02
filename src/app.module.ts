import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureController } from './temperature/temperature.controller';
import { ServoController } from './servo/servo.controller';

@Module({
  imports: [],
  controllers: [AppController, TemperatureController, ServoController],
  providers: [AppService],
})
export class AppModule {}

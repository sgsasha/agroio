import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureController } from './temperature/temperature.controller';

@Module({
  imports: [],
  controllers: [AppController, TemperatureController],
  providers: [AppService],
})
export class AppModule {}

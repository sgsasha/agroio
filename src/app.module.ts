import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { TemperatureModule } from './temperature/temperature.module';
import { MoistureModule } from './moisture/moisture.module';
import { PumpModule } from './pump/pump.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://alex:manulkushaettravku@cluster0.04jpx.mongodb.net/agroio?retryWrites=true&w=majority'),
    TemperatureModule,
    MoistureModule,
    PumpModule,
    DevicesModule
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}

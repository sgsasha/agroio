import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServoController } from './servo/servo.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { TemperatureModule } from './temperature/temperature.module';
import { MoistureController } from './moisture/moisture.controller';
import { MoistureModule } from './moisture/moisture.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://alex:manulkushaettravku@cluster0.04jpx.mongodb.net/agroio?retryWrites=true&w=majority'),
    TemperatureModule,
    MoistureModule
  ],
  controllers: [
    AppController,
    ServoController,
  ],
  providers: [AppService],
})
export class AppModule {}

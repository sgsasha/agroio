import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MoistureModule } from './moisture/moisture.module';
import { DevicesModule } from './devices/devices.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://alex:manulkushaettravku@cluster0.04jpx.mongodb.net/agroio?retryWrites=true&w=majority'),
    ConfigModule.forRoot(),
    MoistureModule,
    DevicesModule,
    AuthModule,
    UsersModule
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}

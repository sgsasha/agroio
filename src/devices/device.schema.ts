import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = DeviceDto & Document;

@Schema()
export class DeviceDto {
  @Prop()
  deviceId: number;

  @Prop()
  isOnline: boolean;

  @Prop()
  isPumpRunning: boolean;

  @Prop()
  temperature: number;

  @Prop()
  moisture: number;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDto);
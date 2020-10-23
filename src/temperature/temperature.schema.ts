import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemperatureDataDocument = TemperatureData & Document;

@Schema()
export class TemperatureData {
  @Prop()
  temperature: number;

  @Prop()
  date: Date;

  @Prop()
  deviceId: number;
}

export const TemperatureSchema = SchemaFactory.createForClass(TemperatureData);
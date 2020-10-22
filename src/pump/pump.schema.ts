import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PumpDataDocument = PumpStatusDto & Document;

@Schema()
export class PumpStatusDto {
  @Prop()
  runPump: boolean;

  @Prop()
  deviceId: number;

  @Prop()
  date: Date;
}

export const PumpStatusSchema = SchemaFactory.createForClass(PumpStatusDto);
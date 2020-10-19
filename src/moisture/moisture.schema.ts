import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoistureDataDocument = MoistureData & Document;

@Schema()
export class MoistureData {
  @Prop()
  moisture: number;

  @Prop()
  date: Date;
}

export const MoistureSchema = SchemaFactory.createForClass(MoistureData);
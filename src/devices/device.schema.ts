import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type DeviceDocument = DeviceDto & Document;

@Schema()
export class DeviceDto {
  @Prop()
  @ApiProperty()
  deviceId: number;

  @Prop()
  @ApiProperty()
  isOnline?: boolean;

  @Prop()
  @ApiProperty()
  isPumpRunning?: boolean;

  @Prop()
  @ApiProperty()
  temperature?: number;

  @Prop()
  @ApiProperty()
  moisture?: number;

  @Prop()
  @ApiProperty()
  isMoistureThresholdEnabled?: boolean;

  @Prop()
  @ApiProperty()
  minMoistureThreshold?: number;

  @Prop()
  @ApiProperty()
  maxMoistureThreshold?: number;
  
  @Prop()
  @ApiProperty()
  waterLevel?: number;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDto);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type MoistureDataDocument = MoistureDto & Document;

@Schema()
export class MoistureDto {
  @Prop()
  @ApiProperty()
  moisture: number;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  deviceId: number;
}

export abstract class MoistureFilterDto {
  @ApiProperty()
  deviceId: number;
  @ApiProperty()
  fromDate: Date;
  @ApiProperty()
  toDate: Date
}

export abstract class MoistureRequestDto {
  @ApiProperty()
  filters: MoistureFilterDto
}

export const MoistureSchema = SchemaFactory.createForClass(MoistureDto);
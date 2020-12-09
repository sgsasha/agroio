import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type DeviceDocument = DeviceDto & Document;

@Schema()
export class DeviceDto {
  @Prop({
    unique: true,
    required: true
  })
  @ApiProperty()
  deviceId: number;

  @Prop()
  @ApiProperty()
  user: string;

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

export abstract class ICreateDeviceData {
  @ApiProperty()
  deviceId: number;
}

export abstract class IChangeDeviceUserData {
  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  user: string;
}

export abstract class IPagination {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;
}

export abstract class IDeviceFilters {
  @ApiProperty()
  paging: IPagination;
}

export abstract class IDeviceListReqData {
  @ApiProperty()
  filters: IDeviceFilters;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDto);
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

  @Prop()
  @ApiProperty()
  firstActivityDate?: Date;

  @Prop()
  @ApiProperty()
  lastActivityDate?: Date;
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

export abstract class ISorting {
  @ApiProperty()
  sortBy: string;

  @ApiProperty()
  sortDesc: boolean;
}

export abstract class IDeviceFilters {
  @ApiProperty()
  isOnline: boolean;

  @ApiProperty()
  isMoistureThresholdEnabled: boolean;

  @ApiProperty()
  deviceId: string;
}

export abstract class IDeviceListReqData {
  @ApiProperty()
  filters: IDeviceFilters;

  @ApiProperty()
  paging: IPagination;

  @ApiProperty()
  sorting: ISorting;
}

export abstract class IDeviceListResponse {
  @ApiProperty()
  items: DeviceDto[];
  @ApiProperty()
  total: number;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceDto);
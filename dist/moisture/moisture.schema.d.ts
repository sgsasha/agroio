import { Document } from 'mongoose';
export declare type MoistureDataDocument = MoistureDto & Document;
export declare class MoistureDto {
    moisture: number;
    date: Date;
    deviceId: number;
}
export declare abstract class MoistureFilterDto {
    deviceId: number;
    fromDate: Date;
    toDate: Date;
}
export declare abstract class MoistureRequestDto {
    filters: MoistureFilterDto;
}
export declare const MoistureSchema: import("mongoose").Schema<any>;

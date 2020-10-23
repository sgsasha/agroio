import { Document } from 'mongoose';
export declare type MoistureDataDocument = MoistureData & Document;
export declare class MoistureData {
    moisture: number;
    date: Date;
    deviceId: number;
}
export declare const MoistureSchema: import("mongoose").Schema<any>;

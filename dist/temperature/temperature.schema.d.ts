import { Document } from 'mongoose';
export declare type TemperatureDataDocument = TemperatureData & Document;
export declare class TemperatureData {
    temperature: number;
    date: Date;
    deviceId: number;
}
export declare const TemperatureSchema: import("mongoose").Schema<any>;

import { Document } from 'mongoose';
export declare type TemperatureDataDocument = TemperatureData & Document;
export declare class TemperatureData {
    temperature: number;
    date: Date;
}
export declare const TemperatureSchema: import("mongoose").Schema<any>;

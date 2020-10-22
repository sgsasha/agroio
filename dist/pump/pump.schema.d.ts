import { Document } from 'mongoose';
export declare type PumpDataDocument = PumpStatusDto & Document;
export declare class PumpStatusDto {
    runPump: boolean;
    deviceId: number;
    date: Date;
}
export declare const PumpStatusSchema: import("mongoose").Schema<any>;

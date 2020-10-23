import { Document } from 'mongoose';
export declare type DeviceDocument = DeviceDto & Document;
export declare class DeviceDto {
    deviceId: number;
    isOnline: boolean;
    isPumpRunning: boolean;
    temperature: number;
    moisture: number;
}
export declare const DeviceSchema: import("mongoose").Schema<any>;

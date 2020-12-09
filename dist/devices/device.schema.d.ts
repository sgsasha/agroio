import { Document } from 'mongoose';
export declare type DeviceDocument = DeviceDto & Document;
export declare class DeviceDto {
    deviceId: number;
    user: string;
    isOnline?: boolean;
    isPumpRunning?: boolean;
    temperature?: number;
    moisture?: number;
    isMoistureThresholdEnabled?: boolean;
    minMoistureThreshold?: number;
    maxMoistureThreshold?: number;
    waterLevel?: number;
}
export declare abstract class ICreateDeviceData {
    deviceId: number;
}
export declare abstract class IChangeDeviceUserData {
    deviceId: number;
    user: string;
}
export declare const DeviceSchema: import("mongoose").Schema<any>;

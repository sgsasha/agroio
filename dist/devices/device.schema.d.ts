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
export declare abstract class IPagination {
    page: number;
    pageSize: number;
}
export declare abstract class IDeviceFilters {
    paging: IPagination;
}
export declare abstract class IDeviceListReqData {
    filters: IDeviceFilters;
}
export declare abstract class IDeviceListResponse {
    items: DeviceDto[];
    total: number;
}
export declare const DeviceSchema: import("mongoose").Schema<any>;

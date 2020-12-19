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
    firstActivityDate?: Date;
    lastActivityDate?: Date;
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
export declare abstract class ISorting {
    sortBy: string;
    sortDesc: boolean;
}
export declare abstract class IDeviceFilters {
    isOnline: boolean;
    isMoistureThresholdEnabled: boolean;
    deviceId: string;
}
export declare abstract class IDeviceListReqData {
    filters: IDeviceFilters;
    paging: IPagination;
    sorting: ISorting;
}
export declare abstract class IDeviceListResponse {
    items: DeviceDto[];
    total: number;
}
export declare const DeviceSchema: import("mongoose").Schema<any>;

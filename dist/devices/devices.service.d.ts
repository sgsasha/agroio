import { Model } from 'mongoose';
import { DeviceDto } from "./device.schema";
export declare class DevicesService {
    private deviceModel;
    constructor(deviceModel: Model<any>);
    create(deviceDto: DeviceDto): Promise<void>;
    update(deviceData: Partial<DeviceDto>): Promise<void>;
    findAll(email: string): Promise<DeviceDto[]>;
    getTotal(query?: any): Promise<number>;
    getFilteredList(query: any, pagination: any, sorting?: any): Promise<DeviceDto[]>;
    delete(query: any): Promise<DeviceDto[]>;
    findOne(query: any): Promise<DeviceDto>;
}

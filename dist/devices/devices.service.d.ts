import { Model } from 'mongoose';
import { DeviceDto } from "./device.schema";
export declare class DevicesService {
    private deviceModel;
    constructor(deviceModel: Model<any>);
    create(deviceDto: DeviceDto): Promise<void>;
    update(deviceData: Partial<DeviceDto>): Promise<void>;
    findAll(): Promise<DeviceDto[]>;
    findOne(query: any): Promise<DeviceDto>;
}

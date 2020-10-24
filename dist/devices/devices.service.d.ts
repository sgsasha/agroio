import { Model } from 'mongoose';
export declare class DevicesService {
    private deviceModel;
    constructor(deviceModel: Model<any>);
    create(deviceDto: IDevice): Promise<void>;
    update(deviceData: Partial<IDevice>): Promise<void>;
    findAll(): Promise<IDevice[]>;
    findOne(query: Object): Promise<IDevice>;
}

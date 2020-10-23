import { Model } from 'mongoose';
export declare class DevicesService {
    private deviceModel;
    constructor(deviceModel: Model<any>);
    create(deviceDto: any): Promise<void>;
    findAll(): Promise<IDevice[]>;
    findOne(query: Object): Promise<IDevice>;
}

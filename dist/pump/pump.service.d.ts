import { Model } from 'mongoose';
export declare class PumpService {
    private pumpModel;
    constructor(pumpModel: Model<any>);
    create(pumpStatus: IPumpStatus): Promise<void>;
    findAll(): Promise<IPumpStatus[]>;
    getDevicePumpStatus(id: string): Promise<IPumpStatus>;
    getLatest(): Promise<IPumpStatus[]>;
}

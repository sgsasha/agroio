import { Model } from 'mongoose';
export declare class MoistureService {
    private moistureModel;
    constructor(moistureModel: Model<any>);
    create(moistureDto: IMoistureData): Promise<void>;
    findAll(query?: Object): Promise<IMoistureData[]>;
    getLatest(): Promise<IMoistureData[]>;
}

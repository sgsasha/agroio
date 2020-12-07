import { Model } from 'mongoose';
export declare class MoistureService {
    private moistureModel;
    constructor(moistureModel: Model<any>);
    create(moistureDto: IMoistureData): Promise<void>;
    findAll(query?: Object): Promise<IMoistureData[]>;
    getLatest(query?: Object): Promise<IMoistureData>;
    getFilterQuery(body: any): {};
}

import { Model } from 'mongoose';
export declare class TemperatureService {
    private temperatureModel;
    constructor(temperatureModel: Model<any>);
    create(temperatureDto: ITemperatureData): Promise<void>;
    findAll(): Promise<ITemperatureData[]>;
    getLatest(): Promise<ITemperatureData[]>;
}

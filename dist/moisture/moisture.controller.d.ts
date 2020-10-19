import { MoistureService } from './moisture.service';
import { Request } from 'express';
export declare class MoistureController {
    private readonly moistureService;
    temperature: number;
    constructor(moistureService: MoistureService);
    setTemperature(req: Request): void;
    getTemperature(): Promise<ITemperatureData>;
    getTemperatureList(): Promise<ITemperatureData[]>;
}

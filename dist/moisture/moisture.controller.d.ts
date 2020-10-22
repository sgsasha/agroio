import { MoistureService } from './moisture.service';
import { Request } from 'express';
export declare class MoistureController {
    private readonly moistureService;
    constructor(moistureService: MoistureService);
    setTemperature(req: Request): void;
    getLatestMoisture(): Promise<IMoistureData>;
    getMoistureList(): Promise<IMoistureData[]>;
}

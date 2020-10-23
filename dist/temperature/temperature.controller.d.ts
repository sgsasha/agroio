import { Request } from 'express';
import { TemperatureService } from './temperature.service';
export declare class TemperatureController {
    private readonly temperatureService;
    temperature: number;
    constructor(temperatureService: TemperatureService);
    setTemperature(req: Request): void;
    getTemperature(): Promise<ITemperatureData>;
    getTemperatureList(params: any): Promise<ITemperatureData[]>;
}

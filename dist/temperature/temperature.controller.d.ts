import { Request } from 'express';
export declare class TemperatureController {
    temperature: number;
    setTemperature(req: Request): void;
    getTemperature(): number;
}

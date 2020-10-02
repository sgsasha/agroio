import { Request, Response } from 'express';
export declare class TemperatureController {
    temperature: number;
    setTemperature(req: Request): void;
    getTemperature(res: Response): any;
}

import { Request } from 'express';
import { PumpService } from './pump.service';
export declare class PumpController {
    private readonly pumpService;
    constructor(pumpService: PumpService);
    setPumpStatus(req: Request): Promise<void>;
    getPumpStatus(params: any): Promise<IPumpStatus>;
}

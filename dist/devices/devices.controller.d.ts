import { DevicesService } from './devices.service';
import { Request } from 'express';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    setTemperature(req: Request): void;
    getMoistureList(): Promise<IDevice[]>;
    getDeviceById(params: any): Promise<IDevice>;
}

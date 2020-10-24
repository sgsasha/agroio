import { DevicesService } from './devices.service';
import { Request } from 'express';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    setDevice(req: Request): void;
    updateDevice(req: Request): void;
    getDeviceList(): Promise<IDevice[]>;
    getDeviceById(params: any): Promise<IDevice>;
}

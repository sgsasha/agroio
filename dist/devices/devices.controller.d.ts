import { DevicesService } from './devices.service';
import { Request } from 'express';
import { MoistureService } from 'src/moisture/moisture.service';
export declare class DevicesController {
    private readonly devicesService;
    private readonly moistureService;
    constructor(devicesService: DevicesService, moistureService: MoistureService);
    setDevice(req: Request): void;
    updateDevice(req: Request): Promise<void>;
    getDeviceList(): Promise<IDevice[]>;
    getDeviceById(params: any): Promise<IDevice>;
    private checkOnlineStatus;
}

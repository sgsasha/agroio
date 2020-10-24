import { MoistureService } from './moisture.service';
import { Request } from 'express';
import { DevicesService } from 'src/devices/devices.service';
export declare class MoistureController {
    private readonly moistureService;
    private readonly devicesService;
    constructor(moistureService: MoistureService, devicesService: DevicesService);
    setMoisture(req: Request): Promise<void>;
    getLatestMoisture(): Promise<IMoistureData>;
    getMoistureList(params: any): Promise<IMoistureData[]>;
}

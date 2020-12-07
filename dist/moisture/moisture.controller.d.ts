import { MoistureService } from './moisture.service';
import { Request } from 'express';
import { DevicesService } from 'src/devices/devices.service';
import { MoistureRequestDto } from "./moisture.schema";
export declare class MoistureController {
    private readonly moistureService;
    private readonly devicesService;
    constructor(moistureService: MoistureService, devicesService: DevicesService);
    setMoisture(req: Request): Promise<void>;
    getMoistureList(params: any): Promise<IMoistureData[]>;
    getFilteredMoistureList(data: MoistureRequestDto): Promise<IMoistureData[]>;
}

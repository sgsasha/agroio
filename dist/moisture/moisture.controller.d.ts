import { MoistureService } from './moisture.service';
import { Request } from 'express';
import { DevicesService } from 'src/devices/devices.service';
import { MoistureRequestDto } from "./moisture.schema";
import { AuthService } from "../auth/auth.service";
export declare class MoistureController {
    private readonly moistureService;
    private authService;
    private readonly devicesService;
    constructor(moistureService: MoistureService, authService: AuthService, devicesService: DevicesService);
    setMoisture(req: Request): Promise<void>;
    getMoistureList(params: any): Promise<IMoistureData[]>;
    getGroupedMoistures(params: any): Promise<IMoistureData[]>;
    getFilteredMoistureList(data: MoistureRequestDto, req: any, res: any): Promise<void>;
}

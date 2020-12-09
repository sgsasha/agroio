import { DevicesService } from './devices.service';
import { MoistureService } from 'src/moisture/moisture.service';
import { DeviceDto, IChangeDeviceUserData, ICreateDeviceData } from "./device.schema";
import { AuthService } from "../auth/auth.service";
export declare class DevicesController {
    private readonly devicesService;
    private authService;
    private readonly moistureService;
    constructor(devicesService: DevicesService, authService: AuthService, moistureService: MoistureService);
    setDevice(device: ICreateDeviceData, req: any, res: any): Promise<void>;
    updateDevice(device: DeviceDto, req: any): Promise<void>;
    updateDeviceUser(data: IChangeDeviceUserData, req: any, res: any): Promise<void>;
    getDeviceList(req: any): Promise<DeviceDto[]>;
    getDeviceById(params: any, req: any, res: any): Promise<void>;
    private checkOnlineStatus;
    private addMoisture;
}

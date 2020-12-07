import { DevicesService } from './devices.service';
import { MoistureService } from 'src/moisture/moisture.service';
import { DeviceDto } from "./device.schema";
export declare class DevicesController {
    private readonly devicesService;
    private readonly moistureService;
    constructor(devicesService: DevicesService, moistureService: MoistureService);
    setDevice(device: DeviceDto): Promise<void>;
    updateDevice(device: DeviceDto): Promise<void>;
    getDeviceList(): Promise<DeviceDto[]>;
    getDeviceById(params: any): Promise<DeviceDto>;
    private checkOnlineStatus;
    private addMoisture;
}

interface IDevice {
    deviceId: string;
    isOnline: boolean;
    isPumpRunning: boolean;
    moisture: number;
    temperature: number;
    moistureThreshold?: number;
}

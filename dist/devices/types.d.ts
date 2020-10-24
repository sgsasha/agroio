interface IDevice {
    deviceId: string;
    isOnline: boolean;
    isPumpRunning: boolean;
    moisture: number;
    temperature: number;
    isMoistureThresholdEnabled: boolean;
    minMoistureThreshold?: number;
    maxMoistureThreshold?: number;
}

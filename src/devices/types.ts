interface IDevice {
  deviceId: string,
  isOnline: boolean,
  isPumpRunning: boolean,
  moisture: number,
  temperature: number,
  isMoistureThreasholdEnabled: boolean,
  minMoistureThreshold?: number,
  maxMoistureThreshold?: number
}
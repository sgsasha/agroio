import { Response, Request } from 'express';
export declare class ServoController {
    private runServo;
    setTemperature(req: Request, res: Response): void;
    getTemperature(res: Response): void;
}

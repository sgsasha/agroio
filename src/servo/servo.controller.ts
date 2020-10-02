import { Controller, Post, Req, Get, Res, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

enum ServoStatuses {
  START = "start",
  STOP = "stop"
}

@Controller('servo')
export class ServoController {
  private runServo: boolean = false;

  @Post('updateStatus')
  setTemperature(@Req() req: Request, @Res() res: Response): void {
    const status = req.body.status;
    let isError = false;
    if (status === ServoStatuses.START || status === ServoStatuses.STOP) {
      console.log(`Updating status with value: '${req.body.status}'`);
      this.runServo = req.body.status === ServoStatuses.START;
    } else {
      isError = true;
      console.error(`ERROR: unknown status: '${req.body.status}'`);
    }
    res.status(isError ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK).send();
  }

  @Get('status')
  getTemperature(@Res() res: Response): void {
    res.status(HttpStatus.OK).json({runServo: this.runServo});
  }
}

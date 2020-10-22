import { Controller, Post, Req, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { Response, Request } from 'express';

enum PupmStatuses {
  START = "start",
  STOP = "stop"
}

@Controller('pump')
export class PumpController {
  private runServo: boolean = false;

  @Post('updateStatus')
  setTemperature(@Req() req: Request, @Res() res: Response): void {
    const status = req.body.status;
    let isError = false;
    if (status === PupmStatuses.START || status === PupmStatuses.STOP) {
      console.log(`Updating status with value: '${req.body.status}'`);
      this.runServo = req.body.status === PupmStatuses.START;
    } else {
      isError = true;
      console.error(`ERROR: unknown status: '${req.body.status}'`);
    }
    res.status(isError ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.OK).send();
  }

  @Get(':id')
  getTemperature(@Param() params ,@Res() res: Response): any {
    console.log(params.id);
    res.status(HttpStatus.OK).json({runServo: this.runServo});
  }
}

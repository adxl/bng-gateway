import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('exams')
export class ExamsController {
  public constructor(
    @Inject(EXAMS_SERVICE) private readonly examsProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.examsProxy.send('index', {}).pipe(catchRpcException);
  }

  @Get('/kill')
  public kill() {
    return this.examsProxy.send('kill', {}).pipe(catchRpcException);
  }
}

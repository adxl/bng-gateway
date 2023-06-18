import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events')
export class AppController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Get()
  public index() {
    return this.eventsProxy.send('index', {}).pipe(catchRpcException);
  }

  @Get('/kill')
  public kill() {
    return this.eventsProxy.send('kill', {}).pipe(catchRpcException);
  }
}

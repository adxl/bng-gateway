import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';

@Controller('events')
export class EventsController {
  public constructor(
    @Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.eventsProxy.send('index', {});
  }
}

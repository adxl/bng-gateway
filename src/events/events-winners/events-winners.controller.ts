import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events/events-winners')
export class EventsWinnersController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Patch(':event')
  public update(@Param('event', ParseUUIDPipe) event: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.update', { event, body }).pipe(catchRpcException);
  }

  @Get('user/:id')
  public getByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsProxy.send('eventsWinners.getByUser', id).pipe(catchRpcException);
  }
}

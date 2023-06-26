import { Body, Controller, Get, Headers, Inject, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events/events-winners')
export class EventsWinnersController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Patch(':event')
  public update(@Param('event', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.update', { id, token, body }).pipe(catchRpcException);
  }

  @Get('user/:id')
  public getByUser(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.eventsProxy.send('eventsWinners.getByUser', { id, token }).pipe(catchRpcException);
  }
}

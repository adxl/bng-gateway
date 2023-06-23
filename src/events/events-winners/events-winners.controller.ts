import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events/events-winners')
export class EventsWinnersController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.create', body).pipe(catchRpcException);
  }

  @Get()
  public findAll() {
    return this.eventsProxy.send('eventsWinners.findAll', {}).pipe(catchRpcException);
  }

  @Get(':event')
  public findOne(@Param('event', ParseUUIDPipe) event: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.findOne', { event, body }).pipe(catchRpcException);
  }

  @Patch(':event')
  public update(@Param('event', ParseUUIDPipe) event: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.update', { event, body }).pipe(catchRpcException);
  }

  @Delete(':event')
  public remove(@Param('event', ParseUUIDPipe) event: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('eventsWinners.remove', { event, body }).pipe(catchRpcException);
  }
}

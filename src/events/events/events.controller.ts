import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events/events')
export class EventsController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Get()
  public findAll(@Headers('authorization') token: string) {
    return this.eventsProxy.send('events.findAll', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.eventsProxy.send('events.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('events.create', { token, body }).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('events.update', { id, token, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.eventsProxy.send('events.remove', { id, token }).pipe(catchRpcException);
  }
}

import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';

@Controller('events/events')
export class EventsController {
  public constructor(@Inject(EVENTS_SERVICE) private readonly eventsProxy: ClientProxy) {}

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.eventsProxy.send('events.create', body).pipe(catchRpcException);
  }

  @Get()
  public findAll() {
    return this.eventsProxy.send('events.findAll', {}).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsProxy.send('events.findOne', id).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.eventsProxy.send('events.update', { id, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsProxy.send('events.remove', id).pipe(catchRpcException);
  }
}

import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/stations')
export class StationsController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get()
  public findAll(@Headers('authorization') token: string) {
    return this.gearsProxy.send('stations.findAll', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Headers('authorization') token: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('stations.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('stations.create', { token, body }).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Headers('authorization') token: string, @Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('stations.update', { id, token, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Headers('authorization') token: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('stations.remove', { id, token }).pipe(catchRpcException);
  }
}

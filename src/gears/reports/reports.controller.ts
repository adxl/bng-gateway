import { Body, Controller, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/reports')
export class ReportsController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get()
  public findAll(@Headers('authorization') token: string) {
    return this.gearsProxy.send('reports.findAll', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.gearsProxy.send('reports.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('reports.create', { token, body }).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('reports.update', { id, token, body }).pipe(catchRpcException);
  }
}

import { Body, Controller, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from '../../types';

@Controller('exams/attempts')
export class AttemptsController {
  public constructor(@Inject(EXAMS_SERVICE) private readonly attemptsProxy: ClientProxy) {}

  @Get('allEnded')
  public findAllEnded(@Headers('authorization') token: string) {
    return this.attemptsProxy.send('attempts.findAllEnded', { token }).pipe(catchRpcException);
  }
  @Get()
  public findActiveByType(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.attemptsProxy.send('attempts.findActiveByType', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.attemptsProxy.send('attempts.create', { token, body }).pipe(catchRpcException);
  }
  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.attemptsProxy.send('attempts.update', { id, token, body }).pipe(catchRpcException);
  }
}

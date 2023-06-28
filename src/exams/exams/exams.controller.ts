import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('exams/exams')
export class ExamsController {
  public constructor(@Inject(EXAMS_SERVICE) private readonly examsProxy: ClientProxy) {}

  @Get()
  public findAll(@Headers('authorization') token: string) {
    return this.examsProxy.send('exams.findAll', { token }).pipe(catchRpcException);
  }

  @Get('user')
  public findAllUser(@Headers('authorization') token: string) {
    return this.examsProxy.send('exams.findAllUser', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.examsProxy.send('exams.findOne', { id, token }).pipe(catchRpcException);
  }

  @Get('public/:id')
  public findOnePublic(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.examsProxy.send('exams.findOnePublic', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.examsProxy.send('exams.create', { token, body }).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.examsProxy.send('exams.update', { id, token, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.examsProxy.send('exams.remove', { id, token }).pipe(catchRpcException);
  }
}

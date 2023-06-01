import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('exams/attempts')
export class AnswersController {
  public constructor(@Inject(EXAMS_SERVICE) private readonly answersProxy: ClientProxy) {}

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersProxy.send('exams.findOne', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.answersProxy.send('exams.create', body).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.answersProxy.send('exams.update', { id, body }).pipe(catchRpcException);
  }

  @Delete()
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersProxy.send('exams.remove', id).pipe(catchRpcException);
  }
}

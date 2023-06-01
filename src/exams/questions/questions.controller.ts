import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('exams/questions')
export class QuestionsController {
  public constructor(@Inject(EXAMS_SERVICE) private readonly questionsProxy: ClientProxy) {}

  @Get()
  public findOne(@Param('questions.id', ParseUUIDPipe) id: string) {
    return this.questionsProxy.send('create', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.questionsProxy.send('questions.create', body).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.questionsProxy.send('questions.update', { id, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsProxy.send('questions.remove', id).pipe(catchRpcException);
  }
}

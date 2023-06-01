import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('exams/exams')
export class ExamsController {
  public constructor(@Inject(EXAMS_SERVICE) private readonly examsProxy: ClientProxy) {}

  @Get()
  public findAll() {
    return this.examsProxy.send('exams.findAll', {}).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.examsProxy.send('exams.findOne', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.examsProxy.send('exams.create', body).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.examsProxy.send('exams.update', { id, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.examsProxy.send('exams.remove', id).pipe(catchRpcException);
  }
}

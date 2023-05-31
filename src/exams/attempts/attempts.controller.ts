import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('exams/attempts')
export class AttemptsController {
  public constructor(
    @Inject(EXAMS_SERVICE) private readonly attemptsProxy: ClientProxy,
  ) {}

  @Get()
  public findActiveByType(@Param('id', ParseUUIDPipe) id: string) {
    return this.attemptsProxy
      .send('findActiveByType', id)
      .pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.attemptsProxy.send('findOne', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.attemptsProxy.send('create', body).pipe(catchRpcException);
  }
  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: AbstractBody,
  ) {
    return this.attemptsProxy
      .send('update', { id, body })
      .pipe(catchRpcException);
  }
}

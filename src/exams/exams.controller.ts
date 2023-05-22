import {
  Body,
  Controller,
  Delete,
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

@Controller('exams')
export class ExamsController {
  public constructor(
    @Inject(EXAMS_SERVICE) private readonly examsProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.examsProxy.send('index', {}).pipe(catchRpcException);
  }

  @Get('/kill')
  public kill() {
    return this.examsProxy.send('kill', {}).pipe(catchRpcException);
  }

  @Get()
  public findAll() {
    return this.examsProxy.send('findAll', {});
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.examsProxy.send('findOne', id);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.examsProxy.send('create', body);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.examsProxy.send('remove', id);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: AbstractBody,
  ) {
    return this.examsProxy.send('update', { id, body });
  }
}

/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  START MASTER */

import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/vehicles-skins')
export class VehiclesSkinsController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get()
  public findAll() {
    return this.gearsProxy.send('vehiclesSkins.findAll', {}).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('vehiclesSkins.findOne', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.gearsProxy.send('vehiclesSkins.create', body).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('vehiclesSkins.update', { id, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('vehiclesSkins.remove', id).pipe(catchRpcException);
  }
}

/*   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< END MASTER */
/*   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START FEATURE */

import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { CreateSkin, UpdateSkin } from './vehicles-skins.dto';

@Controller('/vehicles-skins')
export class VehiclesSkinsController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get()
  public findAll() {
    return this.gearsProxy.send('vehiclesSkins.findAll', {}).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gearsProxy.send('vehiclesSkins.findOne', { id }).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() data: CreateSkin) {
    return this.gearsProxy.send('vehiclesSkins.create', data).pipe(catchRpcException);
  }

  @Patch(':id')
  public update(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: UpdateSkin) {
    return this.gearsProxy.send('vehiclesSkins.update', { id, body: data }).pipe(catchRpcException);
  }

  @Patch(':id/file')
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(^image)(\/)(jpe?g|png)/g })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.gearsProxy.send('vehiclesSkins.uploadFile', { id, file }).pipe(catchRpcException);
  }

  @Delete(':id')
  public remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gearsProxy.send('vehiclesSkins.remove', id).pipe(catchRpcException);
  }
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>> END FEATURE */
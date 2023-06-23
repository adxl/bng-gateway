import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/rides')
export class RidesController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get('')
  public findAll() {
    return this.gearsProxy.send('rides.findAll', {}).pipe(catchRpcException);
  }

  @Get('/self/:id')
  public findSelfCurrentRide(@Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('rides.findSelfCurrentRide', id).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gearsProxy.send('rides.findOne', id).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.create', body).pipe(catchRpcException);
  }

  @Patch(':id/info')
  public updateInformation(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.info.update', { id, body }).pipe(catchRpcException);
  }

  @Patch(':id/review')
  public updateReview(@Param('id', ParseUUIDPipe) id: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.review.update', { id, body }).pipe(catchRpcException);
  }
}

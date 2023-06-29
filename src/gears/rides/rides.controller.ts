import { Body, Controller, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/rides')
export class RidesController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get('')
  public findAll(@Headers('authorization') token: string) {
    return this.gearsProxy.send('rides.findAll', { token }).pipe(catchRpcException);
  }

  @Get('self')
  public findAllSelf(@Headers('authorization') token: string) {
    return this.gearsProxy.send('rides.self.findAll', { token }).pipe(catchRpcException);
  }

  @Get('current')
  public findSelfCurrent(@Headers('authorization') token: string) {
    return this.gearsProxy.send('rides.self.findCurrent', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.gearsProxy.send('rides.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.create', { token, body }).pipe(catchRpcException);
  }

  @Patch(':id/info')
  public updateInformation(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.info.update', { id, token, body }).pipe(catchRpcException);
  }

  @Get(':id/end/:stationId')
  public endRide(@Param('id', ParseUUIDPipe) id: string, @Param('stationId', ParseUUIDPipe) stationId: string) {
    const body = { endStation: { id: stationId } };
    return this.gearsProxy.send('rides.info.update', { id, body }).pipe(catchRpcException);
  }

  @Patch(':id/review')
  public updateReview(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('rides.review.update', { id, token, body }).pipe(catchRpcException);
  }
}

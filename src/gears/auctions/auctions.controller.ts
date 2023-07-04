import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('gears/auctions/')
export class AuctionsController {
  public constructor(@Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy) {}

  @Get()
  public findActive(@Headers('authorization') token: string) {
    return this.gearsProxy.send('auctions.findActive', { token }).pipe(catchRpcException);
  }

  @Get(':id')
  public findOne(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.gearsProxy.send('auctions.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.gearsProxy.send('auctions.create', { token, body }).pipe(catchRpcException);
  }

  @Delete(':id')
  public close(@Param('id', ParseUUIDPipe) id: string, @Headers('authorization') token: string) {
    return this.gearsProxy.send('auctions.close', { id, token }).pipe(catchRpcException);
  }
}

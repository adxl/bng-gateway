import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { GEARS_SERVICE } from 'src/constants';
import { ClientProxy } from 'src/config/proxy.config';
import { AuctionGateway } from './auctions.gateway';

@Module({
  imports: [ClientProxy(GEARS_SERVICE, process.env.GEARS_HOST || 'gears-api-service', process.env.GEARS_PORT)],
  controllers: [AuctionsController],
  providers: [AuctionGateway],
})
export class AuctionsModule {}

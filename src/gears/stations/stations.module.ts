import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { GEARS_SERVICE } from 'src/constants';
import { StationsController } from './stations.controller';

@Module({
  imports: [ClientProxy(GEARS_SERVICE, process.env.GEARS_HOST || 'gears-api-service', process.env.GEARS_PORT)],
  controllers: [StationsController],
})
export class StationsModule {}

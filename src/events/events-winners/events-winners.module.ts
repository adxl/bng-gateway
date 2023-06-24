import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EVENTS_SERVICE } from 'src/constants';
import { EventsWinnersController } from './events-winners.controller';

@Module({
  imports: [ClientProxy(EVENTS_SERVICE, process.env.EVENTS_HOST || 'events-api-service', process.env.EVENTS_PORT)],
  controllers: [EventsWinnersController],
})
export class EventsWinnersModule {}

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { EventsController } from './events.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'bng_api_events',
          port: 9000,
        },
      },
    ]),
  ],
  controllers: [EventsController],
})
export class EventsModule {}

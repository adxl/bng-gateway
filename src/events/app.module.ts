import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EVENTS_SERVICE } from 'src/constants';
import { AppController } from './app.controller';
import { EventsModule } from 'src/events/events/events.module';
import { ClientProxy } from 'src/config/proxy.config';
import { securityMiddleware } from 'src/middlewares/security.middleware';

@Module({
  imports: [
    ClientProxy(EVENTS_SERVICE, process.env.EVENTS_HOST || 'events-api-service', process.env.EVENTS_PORT),
    EventsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(securityMiddleware).forRoutes(AppController);
  }
}

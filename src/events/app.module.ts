import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENTS_SERVICE } from 'src/constants';
import { securityMiddleware } from 'src/middlewares/security.middleware';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.EVENTS_HOST || 'events-api-service',
          port: Number(process.env.EVENTS_PORT) || 9000,
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(securityMiddleware).forRoutes(AppController);
  }
}

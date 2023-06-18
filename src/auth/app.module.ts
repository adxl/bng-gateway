import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { securityMiddleware } from 'src/middlewares/security.middleware';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST || 'auth-api-service',
          port: Number(process.env.AUTH_PORT) || 9000,
        },
      },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(securityMiddleware).forRoutes(AppController);
  }
}

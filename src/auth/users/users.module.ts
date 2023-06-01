import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { UsersController } from './users.controller';

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
  ],
  controllers: [UsersController],
})
export class UsersModule {}

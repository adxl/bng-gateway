import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { AuthController } from './auth.controller';

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
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { AUTH_SERVICE } from 'src/constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [ClientProxy(AUTH_SERVICE, process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT)],
  controllers: [AuthController],
})
export class AuthModule {}

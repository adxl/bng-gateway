import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { AUTH_SERVICE } from 'src/constants';
import { UsersController } from './users.controller';

@Module({
  imports: [ClientProxy(AUTH_SERVICE, process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT)],
  controllers: [UsersController],
})
export class UsersModule {}

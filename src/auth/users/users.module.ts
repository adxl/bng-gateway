import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/constants';
import { UsersController } from './users.controller';
import { ClientProxy } from 'src/config/proxy.config';

@Module({
  imports: [ClientProxy(AUTH_SERVICE, process.env.AUTH_SERVICE || 'auth-api-service', process.env.AUTH_PORT)],
  controllers: [UsersController],
})
export class UsersModule {}

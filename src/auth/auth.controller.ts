import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';

@Controller('auth')
export class AuthController {
  public constructor(
    @Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.authProxy.send('index', {});
  }
}

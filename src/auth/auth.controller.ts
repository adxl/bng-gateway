import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { AbstractBody } from 'src/types';

@Controller('auth')
export class AuthController {
  public constructor(
    @Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.authProxy.send('index', {});
  }

  @Post('/register')
  public register(@Body() body: AbstractBody) {
    return this.authProxy.send('register', body);
  }

  @Post('/login')
  public login(@Body() body: AbstractBody) {
    return this.authProxy.send('login', body);
  }
}

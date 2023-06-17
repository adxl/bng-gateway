import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy) {}

  @Get('/me')
  public me(@Headers('authorization') token: string) {
    return this.authProxy.send('auth.me', { token }).pipe(catchRpcException);
  }

  @Post('/register')
  public register(@Body() body: AbstractBody) {
    return this.authProxy.send('auth.register', body).pipe(catchRpcException);
  }

  @Post('/login')
  public login(@Body() body: AbstractBody) {
    return this.authProxy.send('auth.login', body).pipe(catchRpcException);
  }
}

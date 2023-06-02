import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy) {}

  @Post('/register')
  public register(@Body() body: AbstractBody) {
    return this.authProxy.send('auth.register', body).pipe(catchRpcException);
  }

  @Post('/login')
  public login(@Body() body: AbstractBody) {
    return this.authProxy.send('auth.login', body).pipe(catchRpcException);
  }
}

import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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
  public register(@Body() data: RegisterDto) {
    return this.authProxy.send('register', data);
  }

  @Post('/login')
  public login(@Body() data: LoginDto) {
    return this.authProxy.send('login', data);
  }
}

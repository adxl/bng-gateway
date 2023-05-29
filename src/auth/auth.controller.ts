import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('auth')
export class AuthController {
  public constructor(@Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy) {}

  @Get()
  public index() {
    return this.authProxy.send('index', {}).pipe(catchRpcException);
  }

  @Get('/kill')
  public kill() {
    return this.authProxy.send('kill', {}).pipe(catchRpcException);
  }

  @Post('/register')
  public register(@Body() body: AbstractBody) {
    return this.authProxy.send('register', body).pipe(catchRpcException);
  }

  @Post('/login')
  public login(@Body() body: AbstractBody) {
    return this.authProxy.send('login', body).pipe(catchRpcException);
  }

  @Get('/users')
  public getAllUsers() {
    return this.authProxy.send('allUsers', {}).pipe(catchRpcException);
  }

  @Get('/users/:id')
  public getOneUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authProxy.send('oneUser', id).pipe(catchRpcException);
  }

  @Patch('/users/:id/role')
  public updateUserRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AbstractBody,
  ) {
    return this.authProxy
      .send('updateRole', { id: id, role: body.role })
      .pipe(catchRpcException);
  }

  @Delete('/users/:id')
  public deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authProxy.send('removeUser', id).pipe(catchRpcException);
  }
}

import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('auth/users')
export class UsersController {
  public constructor(@Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy) {}

  @Get('')
  public findAll(@Headers('authorization') token: string) {
    return this.authProxy.send('users.findAll', { token }).pipe(catchRpcException);
  }

  @Post('many')
  public findMany(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.findMany', { token, ids: body.ids || [] }).pipe(catchRpcException);
  }

  @Post('many/public')
  public findManyPublic(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.findMany.public', { token, ids: body.ids || [] }).pipe(catchRpcException);
  }

  @Get('/:id')
  public findOne(@Headers('authorization') token: string, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.authProxy.send('users.findOne', { id, token }).pipe(catchRpcException);
  }

  @Post()
  public create(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.create', { token, body }).pipe(catchRpcException);
  }

  @Patch('/:id/password')
  public updatePassword(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.updatePassword', { body, token }).pipe(catchRpcException);
  }

  @Patch('/:id/profile')
  public updateProfile(@Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.updateProfile', { token, body }).pipe(catchRpcException);
  }

  @Patch('/:id/role')
  public updateRole(@Param('id', new ParseUUIDPipe()) id: string, @Headers('authorization') token: string, @Body() body: AbstractBody) {
    return this.authProxy.send('users.updateRole', { id, body, token }).pipe(catchRpcException);
  }

  @Delete('/:id')
  public remove(@Param('id', new ParseUUIDPipe()) id: string, @Headers('authorization') token: string) {
    return this.authProxy.send('users.remove', { id, token }).pipe(catchRpcException);
  }
}

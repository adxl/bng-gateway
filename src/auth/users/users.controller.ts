import { Body, Controller, Delete, Get, Headers, Inject, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/constants';
import { catchRpcException } from 'src/exceptions/exceptions.pipe';
import { AbstractBody } from 'src/types';

@Controller('users')
export class UsersController {
  public constructor(@Inject(AUTH_SERVICE) private readonly authProxy: ClientProxy) {}

  @Get('')
  public findAll(@Headers('authorization') token: string) {
    return this.authProxy.send('users.findAll', { token }).pipe(catchRpcException);
  }

  @Get('/:id')
  public findOne(@Param('id', new ParseUUIDPipe()) id: string, @Headers('authorization') token: string) {
    return this.authProxy.send('users.findOne', { id, token }).pipe(catchRpcException);
  }

  @Patch('/:id/password')
  public updatePassword(@Body() body: AbstractBody, @Headers('authorization') token: string) {
    return this.authProxy.send('users.updatePassword', {
      oldPwd: body.oldPwd,
      newPwd: body.newPwd,
      token,
    });
  }

  @Patch('/:id/profile')
  public updateProfile(@Body() body: AbstractBody, @Headers('authorization') token: string) {
    return this.authProxy.send('users.updateProfile', {
      firstName: body.firstName,
      lastName: body.lastName,
      token,
    });
  }

  @Patch('/:id/role')
  public updateRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AbstractBody,
    @Headers('authorization') token: string,
  ) {
    return this.authProxy
      .send('users.updateRole', {
        id: id,
        role: body.role,
        token,
      })
      .pipe(catchRpcException);
  }

  @Delete('/:id')
  public remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.authProxy.send('users.remove', id).pipe(catchRpcException);
  }
}

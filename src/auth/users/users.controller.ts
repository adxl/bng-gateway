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
    return this.authProxy.send('users.findAll', { jwt: { token } }).pipe(catchRpcException);
  }

  @Get('/:id')
  public findOne(@Param('id', new ParseUUIDPipe()) id: string, @Headers('authorization') token: string) {
    return this.authProxy.send('users.findOne', { id, jwt: { token } }).pipe(catchRpcException);
  }

  @Post()
  public create(@Body() body: AbstractBody, @Headers('authorization') token: string) {
    console.log({ jwt: { token }, body });

    return this.authProxy.send('users.create', { jwt: { token }, body }).pipe(catchRpcException);
  }

  @Patch('/:id/password')
  public updatePassword(@Body() body: AbstractBody, @Headers('authorization') token: string) {
    return this.authProxy.send('users.updatePassword', {
      oldPwd: body.oldPwd,
      password: body.password,
      jwt: { token },
    });
  }

  @Patch('/:id/profile')
  public updateProfile(@Body() body: AbstractBody, @Headers('authorization') token: string) {
    return this.authProxy.send('users.updateProfile', {
      firstName: body.firstName,
      lastName: body.lastName,
      jwt: { token },
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
        jwt: { token },
      })
      .pipe(catchRpcException);
  }

  @Delete('/:id')
  public remove(@Param('id', new ParseUUIDPipe()) id: string, @Headers('authorization') token: string) {
    return this.authProxy.send('users.remove', { id, jwt: { token } }).pipe(catchRpcException);
  }
}

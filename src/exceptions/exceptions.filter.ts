import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';

type ExceptionBody = {
  timestamp: string;
  statusCode: number;
  message: string;
};

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const body: Partial<ExceptionBody> = {
      timestamp: new Date().toISOString(),
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: 'Internal Server Error ❌',
    };

    if (exception instanceof RpcException) {
      const error: any = exception.getError();
      body.statusCode = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      body.message = error?.message || 'Internal Server Error 💀';
    }

    httpAdapter.reply(context.getResponse(), body, body.statusCode);
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(RpcExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const body: Partial<ExceptionBody> = {
      timestamp: new Date().toISOString(),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error ❌',
    };

    if (exception instanceof HttpException) {
      body.statusCode = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      body.message = exception.message || 'Gateway Internal Server Error 💀';
    }

    if (exception instanceof RpcException) {
      const error: any = exception.getError();
      body.statusCode = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      body.message = error?.message || 'API Internal Server Error 💀';
    }

    this.logger.error({ message: body.message, exception: exception || null });

    httpAdapter.reply(context.getResponse(), body, body.statusCode);
  }
}

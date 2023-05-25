import { RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

export const catchRpcException = catchError((error) =>
  throwError(() => new RpcException(error.response)),
);

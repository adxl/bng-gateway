import { LogLevel, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './config/swagger.config';
import * as compression from 'compression';
import { RpcExceptionFilter } from './exceptions/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'] as LogLevel[],
  });

  app.enableCors({
    origin: [/localhost/, /\.vercel\.app$/],
  });

  initSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(compression());

  app.useGlobalFilters(new RpcExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(process.env.PORT || 9000);
}

bootstrap();

import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './config/swagger.config';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      'error',
      ...(process.env.STAGE === 'local' ? ['warn', 'debug', 'log'] : []),
    ] as LogLevel[],
  });

  app.enableCors({
    origin: [/localhost/, /\.vercel\.app$/],
  });

  initSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(compression());

  await app.listen(9000);
}

bootstrap();

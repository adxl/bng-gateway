import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppModule as AuthModule } from './auth/app.module';
import { AppModule as EventsModule } from './events/app.module';
import { AppModule as ExamsModule } from './exams/app.module';
import { AppModule as GearsModule } from './gears/app.module';
import { securityMiddleware } from './middlewares/security.middleware';

@Module({
  imports: [AuthModule, ExamsModule, EventsModule, GearsModule],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(securityMiddleware).forRoutes(AppController);
  }
}

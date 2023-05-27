import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { AppModule as ExamsModule } from './exams/app.module';
import { GearsModule } from './gears/gears.module';

@Module({
  imports: [AuthModule, ExamsModule, EventsModule, GearsModule],
  controllers: [AppController],
})
export class AppModule {}

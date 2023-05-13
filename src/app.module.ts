import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ExamsModule } from './exams/exams.module';
import { GearsModule } from './gears/gears.module';

@Module({
  imports: [AuthModule, EventsModule, ExamsModule, GearsModule],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ExamsModule } from './exams/exams.module';
import { GearsModule } from './gears/gears.module';

@Module({
  imports: [AuthModule, EventsModule, ExamsModule, GearsModule],
})
export class AppModule {}

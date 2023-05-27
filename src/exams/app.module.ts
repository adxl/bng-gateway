import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { ExamsModule } from 'src/exams/exams/exams.module';
import { AppController } from './app.controller';

@Module({
  imports: [ClientProxy(EXAMS_SERVICE, 'exams-api-service'), ExamsModule],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { AnswersModule } from 'src/exams/answers/answers.module';
import { AttemptsModule } from 'src/exams/attempts/attempts.module';
import { ExamsModule } from 'src/exams/exams/exams.module';
import { QuestionsModule } from 'src/exams/questions/questions.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientProxy(EXAMS_SERVICE, process.env.EXAMS_HOST || 'exams-api-service', process.env.EXAMS_PORT),
    ExamsModule,
    AttemptsModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

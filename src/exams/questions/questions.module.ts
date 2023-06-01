import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [ClientProxy(EXAMS_SERVICE, process.env.EXAMS_HOST || 'exams-api-service', process.env.EXAMS_PORT)],
  controllers: [QuestionsController],
})
export class QuestionsModule {}

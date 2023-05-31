import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { AnswersController } from './answers.controller';

@Module({
  imports: [ClientProxy(EXAMS_SERVICE, 'exams-api-service')],
  controllers: [AnswersController],
})
export class AnswersModule {}

import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { AttemptsController } from './attempts.controller';

@Module({
  imports: [ClientProxy(EXAMS_SERVICE, 'exams-api-service')],
  controllers: [AttemptsController],
})
export class AttemptsModule {}

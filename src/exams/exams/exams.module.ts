import { Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { EXAMS_SERVICE } from 'src/constants';
import { ExamsController } from './exams.controller';

@Module({
  imports: [ClientProxy(EXAMS_SERVICE, 'exams-api-service')],
  controllers: [ExamsController],
})
export class ExamsModule {}

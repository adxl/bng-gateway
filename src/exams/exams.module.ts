import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EXAMS_SERVICE } from 'src/constants';
import { ExamsController } from './exams.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EXAMS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.EXAMS_HOST || 'exams-api-service',
          port: Number(process.env.EXAMS_PORT) || 9000,
        },
      },
    ]),
  ],
  controllers: [ExamsController],
})
export class ExamsModule {}

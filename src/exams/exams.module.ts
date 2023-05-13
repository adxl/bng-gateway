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
          host: 'exams-api-service',
          port: 9000,
        },
      },
    ]),
  ],
  controllers: [ExamsController],
})
export class ExamsModule {}

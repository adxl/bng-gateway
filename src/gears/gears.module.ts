import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';
import { GearsController } from './gears.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GEARS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.GEARS_HOST || 'gears-api-service',
          port: Number(process.env.GEARS_PORT) || 9000,
        },
      },
    ]),
  ],
  controllers: [GearsController],
})
export class GearsModule {}

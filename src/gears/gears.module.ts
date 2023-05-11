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
          host: 'bng_api_gears',
          port: 9000,
        },
      },
    ]),
  ],
  controllers: [GearsController],
})
export class GearsModule {}

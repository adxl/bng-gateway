import { ClientsModule, Transport } from '@nestjs/microservices';
import type { Service } from 'src/constants';

export const ClientProxy = (name: Service, host: string) =>
  ClientsModule.register([
    {
      name,
      transport: Transport.TCP,
      options: {
        host,
        port: 9000,
      },
    },
  ]);

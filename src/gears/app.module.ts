import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientProxy } from 'src/config/proxy.config';
import { GEARS_SERVICE } from 'src/constants';
import { securityMiddleware } from 'src/middlewares/security.middleware';
import { AppController } from './app.controller';
import { ReportsModule } from './reports/reports.module';
import { RidesModule } from './rides/rides.module';
import { StationsModule } from './stations/stations.module';
import { VehiclesSkinsModule } from './vehicles-skins/vehicles-skins.module';
import { VehiclesTypesModule } from './vehicles-types/vehicles-types.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ClientProxy(GEARS_SERVICE, process.env.GEARS_HOST || 'gears-api-service', process.env.GEARS_PORT),
    StationsModule,
    VehiclesModule,
    VehiclesTypesModule,
    VehiclesSkinsModule,
    RidesModule,
    ReportsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(securityMiddleware).forRoutes(AppController);
  }
}

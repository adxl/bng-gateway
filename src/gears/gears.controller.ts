import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GEARS_SERVICE } from 'src/constants';

@Controller('gears')
export class GearsController {
  public constructor(
    @Inject(GEARS_SERVICE) private readonly gearsProxy: ClientProxy,
  ) {}

  @Get()
  public index() {
    return this.gearsProxy.send('index', {});
  }
}

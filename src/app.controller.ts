import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public index() {
    return {
      'Auth API': '/auth',
      'Events API': '/events',
      'Exams API': '/exams',
      'Gears API': '/gears',
    };
  }
}

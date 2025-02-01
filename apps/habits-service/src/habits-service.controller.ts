import { Controller, Get } from '@nestjs/common';
import { HabitsServiceService } from './habits-service.service';

@Controller()
export class HabitsServiceController {
  constructor(private readonly habitsServiceService: HabitsServiceService) {}

  @Get()
  getHello(): string {
    return this.habitsServiceService.getHello();
  }
}

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthguardGuard } from '../authguard/authguard.guard';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get('all')
  @UseGuards(AuthguardGuard)
  geteAllHabits(@Req() req){
    
    return req.user
  }
}

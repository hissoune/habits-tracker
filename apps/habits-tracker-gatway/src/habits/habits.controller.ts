import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthguardGuard } from '../authguard/authguard.guard';
import { Roles } from '../authguard/roles.decorator';
import { RolesGuard } from '../authguard/roles.guard';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get('all')
  @UseGuards(AuthguardGuard,RolesGuard)
  @Roles('client', 'manager')  

  geteAllHabits(@Req() req){
    
    return req.user
  }
}

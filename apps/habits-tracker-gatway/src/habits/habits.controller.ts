import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthguardGuard } from '../authguard/authguard.guard';

import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Controller('habits')
@UseGuards(AuthguardGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get('all')
    getAllHabits(@Request() req) {
      const user = req.user
    const userId = user.id
    
    
    return this.habitsService.getAll(userId);
  }

  @Get(':id')
  getHabit(@Param('id') id: string) {
    return this.habitsService.getOne(id);
  }

  @Post()
  createHabit(@Request() req,@Body() createHabitDto: CreateHabitDto) {
    const user = req.user
    createHabitDto.userId = user.id
    return this.habitsService.create(createHabitDto);
  }

  @Put(':id')
  updateHabit(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(id, updateHabitDto);
  }

  @Delete(':id')
  deleteHabit(@Param('id') id: string) {
    return this.habitsService.delete(id);
  }
}

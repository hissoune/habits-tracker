import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthguardGuard } from '../authguard/authguard.guard';
import { Roles } from '../authguard/roles.decorator';
import { RolesGuard } from '../authguard/roles.guard';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get('all')
  @UseGuards(AuthguardGuard, RolesGuard)
  @Roles('client', 'manager')  
  getAllHabits() {
    return this.habitsService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthguardGuard, RolesGuard)
  @Roles('client', 'manager')
  getHabit(@Param('id') id: string) {
    return this.habitsService.getOne(id);
  }

  @Post()
  @UseGuards(AuthguardGuard, RolesGuard)
  @Roles('manager')
  createHabit(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Put(':id')
  @UseGuards(AuthguardGuard, RolesGuard)
  @Roles('manager')
  updateHabit(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.update(id, updateHabitDto);
  }

  @Delete(':id')
  @UseGuards(AuthguardGuard, RolesGuard)
  @Roles('manager')
  deleteHabit(@Param('id') id: string) {
    return this.habitsService.delete(id);
  }
}

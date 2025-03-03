import { Body, Controller, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { HabitsServiceService } from './habits-service.service';
import { AuthguardGuard } from './authguard/authguard.guard';
import { CreateHabitDto } from './dto/create-habit.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('habits') 
export class HabitsController {

  constructor(private readonly habitsService: HabitsServiceService) {}

  @Get('health')
    checkHealth() {
    return 'UP'
  }
 
  @Get('/all')
  @UseGuards(AuthguardGuard)
      getAllHabits(@Req() req) {        
        const user = req.user
      const userId = user.id
      
      
      return this.habitsService.getHabits(userId);
    }
  
    @Get(':id')
    @UseGuards(AuthguardGuard)
    getHabit(@Param('id') id: string) {
      return this.habitsService.getHabitById(id);
    }
  
    @Post()
    @UseGuards(AuthguardGuard)
    createHabit(@Req() req,@Body() createHabitDto: CreateHabitDto) {
      const user = req.user
      createHabitDto.userId = user.id
      return this.habitsService.createHabit(createHabitDto);
    }


    @Patch('/:habitId')
   async reactiveHabit(@Param('habitId') habitId: string) {
      
      
      const habit =  await this.habitsService.reactiveHabit(habitId);
      
      return  habit
      
    }

   
 
}





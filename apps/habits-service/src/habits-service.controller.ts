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
  
    // @Put(':id')
    // updateHabit(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    //   return this.habitsService.update(id, updateHabitDto);
    // }

    @Patch('/:habitId')
    reactiveHabit(@Param('habitId') habitId: string) {
      return this.habitsService.reactiveHabit(habitId);
    }
    @Cron(CronExpression.EVERY_10_SECONDS, { name: 'dailyHabitProgress' })
    async handleDailyHabits() {
      console.log('Updating daily habit progress...');
      await this.habitsService.updateProgressByFrequency('daily');
    }
  
    @Cron(CronExpression.EVERY_WEEK, { name: 'weeklyHabitProgress' })
    async handleWeeklyHabits() {
      console.log('Updating weekly habit progress...');
      await this.habitsService.updateProgressByFrequency('weekly');
    }
  
    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { name: 'monthlyHabitProgress' })
    async handleMonthlyHabits() {
      console.log('Updating monthly habit progress...');
      await this.habitsService.updateProgressByFrequency('monthly');
    }
  
    // @Delete(':id')
    // deleteHabit(@Param('id') id: string) {
    //   return this.habitsService.delete(id);
    // }
}




// @MessagePattern("updateHabit")
// updateHabit(data: { id: string, habit: any }): string {
//   return this.habitsServiceService.updateHabit(data.id, data.habit);
// }

// @MessagePattern("deleteHabit")
// deleteHabit(id: string): string {
//   return this.habitsServiceService.deleteHabit(id);
// }
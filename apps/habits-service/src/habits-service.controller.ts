import { Controller, Get } from '@nestjs/common';
import { HabitsServiceService } from './habits-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Habit } from './schemas/habit.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller() //ask about if that necesary
export class HabitsServiceController {
  constructor(private readonly habitsServiceService: HabitsServiceService) {}

  @MessagePattern("create_habit")
  createHabit(@Payload() data:Habit) {
  
    return this.habitsServiceService.createHabit(data);
  }
  @MessagePattern("get_all_habits")
    getHabits(@Payload() data:{userId:string}) {
      
      return this.habitsServiceService.getHabits(data.userId);
    }

    @MessagePattern("get_habit")
    getHabitById(@Payload() data: any) {
    return this.habitsServiceService.getHabitById(data.id);
  }
    // @MessagePattern('compleetProgress')
    // compleeteProgress(@Payload() data:{id:string,userId:string}){
    //     return this.habitProgressService.compleeteProgress(data.id,data.userId)
    // }

    @Cron(CronExpression.EVERY_10_SECONDS, { name: 'dailyHabitProgress' })
  async handleDailyHabits() {
    console.log('Updating daily habit progress...');
    await this.habitsServiceService.updateProgressByFrequency('daily');
  }

  @Cron(CronExpression.EVERY_WEEK, { name: 'weeklyHabitProgress' })
  async handleWeeklyHabits() {
    console.log('Updating weekly habit progress...');
    await this.habitsServiceService.updateProgressByFrequency('weekly');
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { name: 'monthlyHabitProgress' })
  async handleMonthlyHabits() {
    console.log('Updating monthly habit progress...');
    await this.habitsServiceService.updateProgressByFrequency('monthly');
  }


}




// @MessagePattern("updateHabit")
// updateHabit(data: { id: string, habit: any }): string {
//   return this.habitsServiceService.updateHabit(data.id, data.habit);
// }

// @MessagePattern("deleteHabit")
// deleteHabit(id: string): string {
//   return this.habitsServiceService.deleteHabit(id);
// }
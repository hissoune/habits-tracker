import { Injectable } from '@nestjs/common';
import { HabitImplementations } from './implimentations/habit.implimentations';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Habit } from './schemas/habit.schema';

@Injectable()
export class HabitsServiceService {
 
    constructor(private readonly habitsImplimentations: HabitImplementations) {}
  
  createHabit(habit) {
    return this.habitsImplimentations.createHabit(habit);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'dailyHabitProgress' })
  async handleDailyHabits() {
    console.log('Updating daily habit progress...');
    await this.updateProgressByFrequency('daily');
  }

  @Cron(CronExpression.EVERY_WEEK, { name: 'weeklyHabitProgress' })
  async handleWeeklyHabits() {
    console.log('Updating weekly habit progress...');
    await this.updateProgressByFrequency('weekly');
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { name: 'monthlyHabitProgress' })
  async handleMonthlyHabits() {
    console.log('Updating monthly habit progress...');
    await this.updateProgressByFrequency('monthly');
  }



  private async updateProgressByFrequency(frequency: string) {
    const habits: Habit[] = await this.habitsImplimentations.getHabitsByFrequency(frequency);
console.log(habits);

    for (const habit of habits) {
      const userId = habit.userId;

      let progress = await this.habitsImplimentations.getProgress(habit._id as unknown as string, userId as unknown as string);

      if (!progress) {
        await this.habitsImplimentations.createProgress(habit._id as unknown as string, userId as unknown as string, 1);
        console.log(`Progress created for habit: ${habit.title} (${frequency})`);
      } else {
       
        await this.habitsImplimentations.updateProgress(habit._id as unknown as string, userId as unknown as string);
        console.log(`Progress updated for habit: ${habit.title} (${frequency})`);
      }
    }
  }


  // @Cron(CronExpression.EVERY_5_SECONDS,{ name: 'habitCronJob' })
  // handleCron() {
  //  console.log('Called when the current second is 45');
  // }
}

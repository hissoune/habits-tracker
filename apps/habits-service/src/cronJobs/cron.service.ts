import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { HabitsServiceService } from "../habits-service.service";


@Injectable()
export class CronService {
constructor(private readonly habitsService:HabitsServiceService){}

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
}
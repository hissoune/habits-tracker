import { Injectable } from "@nestjs/common";
import { ChalengesService } from "../chalenges.service";
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class CronService {
constructor(private readonly chalengeService:ChalengesService){}

@Cron(CronExpression.EVERY_30_SECONDS, { name: 'dailychalengeProgress' })
  async handleDailyHabits() {
    console.log('Updating daily chalenge progress...');
    await this.chalengeService.updateChalengesProgressByFrequency('daily');
  }

  @Cron(CronExpression.EVERY_WEEK, { name: 'weeklychalengeProgress' })
  async handleWeeklyHabits() {
    console.log('Updating weekly chalenge progress...');
    await this.chalengeService.updateChalengesProgressByFrequency('weekly');
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { name: 'monthlychalengeProgress' })
  async handleMonthlyHabits() {
    console.log('Updating monthly chalenge progress...');
    await this.chalengeService.updateChalengesProgressByFrequency('monthly');
  }

}
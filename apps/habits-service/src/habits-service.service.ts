import { Injectable } from '@nestjs/common';
import { HabitImplementations } from './implimentations/habit.implimentations';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Habit } from './schemas/habit.schema';
import { HabitProgressService } from './habitsProgress/habitProgress.service';

@Injectable()
export class HabitsServiceService {
 
    constructor(private readonly habitsImplimentations: HabitImplementations,private readonly habitProgressService:HabitProgressService) {}
  
  createHabit(habit) {
    return this.habitsImplimentations.createHabit(habit);
  }
  getHabits(userId:string){
    return this.habitsImplimentations.getAllHabits(userId);
  }

  
  async getHabitById(id:string){
   return this.habitsImplimentations.getHabitById(id)
  }


   async updateProgressByFrequency(frequency: string) {
    const habits: Habit[] = await this.habitsImplimentations.getHabitsByFrequency(frequency);

    for (const habit of habits) {
      const userId = habit.userId;

      let progress = await this.habitProgressService.getProgress(habit._id as unknown as string, userId as unknown as string);

      if (!progress) {
        await this.habitProgressService.createProgress(habit._id as unknown as string, userId as unknown as string, 1);
        console.log(`Progress created for habit: ${habit.title} (${frequency})`);
      } else {
       
        await this.habitProgressService.updateProgress(habit._id as unknown as string, userId as unknown as string);
        console.log(`Progress updated for habit: ${habit.title} (${frequency})`);
      }
    }
  }

  

}

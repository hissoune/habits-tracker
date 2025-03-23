import { Inject, Injectable } from '@nestjs/common';
import { HabitsServiceImpl } from './business/impl/habits-service-impl';
import { Habit } from './schemas/habit.schema';
import { HabitProgressService } from './habitsProgress/habitProgress.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HabitsServiceService {
 
    constructor(private readonly habitsImplimentations: HabitsServiceImpl,private readonly habitProgressService:HabitProgressService,@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy) {}
  
  async getHabitCreator (habit:Habit){

    const creator = await this.authClient.send('get-creator', habit.userId).toPromise();
   const habbit= habit.toObject ? habit.toObject():habit
   habbit.userId = creator;
      return habbit
  }   

 async createHabit(habit) {
    const habite = await this.habitsImplimentations.createHabit(habit);
    return await this.getHabitCreator(habite)
  }
async getAllHabitsForAdmin() {
    const habits = await this.habitsImplimentations.getAllHabitsForAdmin();

  await Promise.all(habits.map(async (habit) => {
    await this.getHabitCreator(habit);
  }));

  return habits;
}
  getHabits(userId:string){
    return this.habitsImplimentations.getAllHabits(userId);
  }

  
  async getHabitById(id:string){
   return this.habitsImplimentations.getHabitById(id)
  }
  async reactiveHabit(id:string){
    const habit =  await this.habitsImplimentations.reactiveHabit(id)
    return await this.getHabitCreator(habit)
  }

   async updateProgressByFrequency(frequency: string) {
    const habits: Habit[] = await this.habitsImplimentations.getHabitsByFrequency(frequency);

    for (const habit of habits) {

      if (habit.status === 'completed' || habit.status === 'failed') {
        console.log(`Habit ${habit.title} is already ${habit.status}. Skipping update...`);
        return null;
    }
      const userId = habit.userId;

      const progress = await this.habitProgressService.getProgress(habit._id as unknown as string, userId as unknown as string);
      if (!progress) {
        await this.habitProgressService.createProgress(habit._id as unknown as string, userId as unknown as string, 1);
        console.log(`Progress created for habit: ${habit.title} (${frequency})`);
      } else {
       
        await this.habitProgressService.updateProgress(habit._id as unknown as string, userId as unknown as string);
        console.log(`Progress updated for habit: ${habit.title} (${frequency})`);
      }
    }
  }

 async  deletHabit (id:string){
  return this.habitsImplimentations.deleteHabit(id)
  }

  async updatehabit(habitId:string,habit){
    return this.habitsImplimentations.updateHabit(habitId, habit)

  }

  

}

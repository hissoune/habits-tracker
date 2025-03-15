import { InjectModel } from '@nestjs/mongoose';
import { HabitsService } from '../habits-service';
import {  Habit } from '../../schemas/habit.schema';
import mongoose, { Model } from 'mongoose';
import { HabitProgress } from '../../schemas/habitProgress.schema';

export class HabitsServiceImpl implements HabitsService {
  

    constructor(
        @InjectModel(Habit.name) private readonly habitModel:Model<Habit>,
        @InjectModel(HabitProgress.name) private readonly habitProgressModel:Model<HabitProgress>
         ) { }
    



    async createHabit(habit: Habit): Promise<Habit> {
       const newHabit=new this.habitModel(habit);
       
       return newHabit.save()
    }

    async getHabitById(id: string): Promise<Habit | null> {
       return this.habitModel.findById(id)
    }

    async updateHabit(id: string, habit: Partial<Habit>): Promise<Habit | null> {
       return this.habitModel.findByIdAndUpdate(id, habit)
    }

   async reactiveHabit(id: string): Promise<Habit | null> {
        const habit =  await this.habitModel.findByIdAndUpdate(id, {$set:{sucsess:0,fails:0,progress:0,status:"active"}},{new:true});
          return habit
    }

    async deleteHabit(id: string): Promise<Habit> {
        const habit = await this.habitModel.findById(id)
        if (!habit) {
          throw new Error("Habit not found")
        }

        await this.habitProgressModel.deleteMany({ habitId: id })
        

        return await this.habitModel.findByIdAndDelete(id)
    }

    async getAllHabits(userId:string): Promise<Habit[]> {
        return this.habitModel.find({userId})
    }

    async getAllHabitsForAdmin(): Promise<Habit[]>{
    return this.habitModel.find()
    }
    
    async getHabitsByFrequency(frequency: string): Promise<Habit[]> {
        return this.habitModel.find({ frequency ,status:'active' });
    }

  


}
    
   

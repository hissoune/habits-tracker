import { InjectModel } from '@nestjs/mongoose';
import { HabitInterface } from '../interfaces/habit.interface';
import {  Habit } from '../schemas/habit.schema';
import { Model } from 'mongoose';

export class HabitImplementations implements HabitInterface {
  

    constructor(@InjectModel(Habit.name) private readonly habitModel:Model<Habit>) { }

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

    async deleteHabit(id: string): Promise<boolean> {
      return this.habitModel.findByIdAndDelete(id)
    }

    async getAllHabits(): Promise<Habit[]> {
        return this.habitModel.find()
    }
}
    
   

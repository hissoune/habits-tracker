import { InjectModel } from '@nestjs/mongoose';
import { HabitInterface } from '../interfaces/habit.interface';
import {  Habit } from '../schemas/habit.schema';
import { Model } from 'mongoose';
import { HabitProgress } from '../habitsProgress/habitProgress.schema';

export class HabitImplementations implements HabitInterface {
  

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

    async deleteHabit(id: string): Promise<boolean> {
      return this.habitModel.findByIdAndDelete(id)
    }

    async getAllHabits(): Promise<Habit[]> {
        return this.habitModel.find()
    }
    
    async getHabitsByFrequency(frequency: string): Promise<Habit[]> {
        return this.habitModel.find({ frequency ,status:'active' });
    }

    async getProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        return this.habitProgressModel.findOne({ habitId, userId });
    }

    async createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> {

        const progress = new this.habitProgressModel({
          habitId,
          userId,
          date:Date.now(),
          streak,
          lastUpdated: new Date(),
        });
      
        return progress.save();
      }

    async updateProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        const habit =await this.habitModel.findById(habitId)

        const progress = await this.habitProgressModel.findOne({ habitId, userId });
        if ( habit.repeats == progress.streak) {
            return this.habitModel.findByIdAndUpdate(habitId, {$set:{status:"completed"}})
        }
        if (progress.status) {
           return this.habitProgressModel.findOneAndUpdate(
          { habitId, userId },
          { $inc: { streak: 1 }, $set: { lastUpdated: new Date() ,status:false} },
          { new: true }
        );
        }
        return this.habitProgressModel.findOneAndUpdate(
            { habitId, userId },
            {  $set: { lastUpdated: new Date(),streak:0 } },
            { new: true }
          );
       
      }
}
    
   

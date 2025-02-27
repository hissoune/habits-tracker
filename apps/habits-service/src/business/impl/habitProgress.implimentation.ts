import { InjectModel } from "@nestjs/mongoose";
import { HabitProgressInterface } from "../habitProgress.interface";
import { HabitProgress } from "../../schemas/habitProgress.schema";
import { Model } from "mongoose";
import { Habit } from "../../schemas/habit.schema";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Status } from "../../../types";




export class HabitProgressImplimentation implements HabitProgressInterface 
{
    constructor(  
        @InjectModel(Habit.name) private readonly habitModel:Model<Habit>,
        @InjectModel(HabitProgress.name) private readonly habitProgressModel:Model<HabitProgress>){}


    async getProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        const progress = await this.habitProgressModel.findOne({ habitId, userId ,progressStatus:'active'});
        
        return progress
    }
    async compleeteProgress(id:string, userId:string) {
        try {
            const progress = await this.habitProgressModel.findById(id);
              
            if (!progress) {
                console.log(`No progress found with id: ${id}`);
                return null;
            }
     
            if (progress.userId.toString() !== userId) {
                console.log(`User ID mismatch. Expected: ${progress.userId}, Received: ${userId}`);
                return null;
            }
    
            if (progress) {
                return await this.habitProgressModel.findByIdAndUpdate(id, { $set: { status: true } }, { new: true });

            }else{
                throw new UnauthorizedException('you cant modify a progress that never exist ')
            }
    
        } catch (error) {
            console.error("Error updating progress:", error);
            return null;
        }
    }
    createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> {
        const progress = new this.habitProgressModel({
            habitId,
            userId,
            date:Date.now(),
           
            lastUpdated: new Date(),
          });
        
          return progress.save(); 
        
        
    }

    async updateProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        try {
            const habit = await this.habitModel.findById(habitId);
            if (!habit) {
                throw new Error('Habit not found');
            }
    
            let progress = await this.habitProgressModel.findOne({ habitId, userId ,progressStatus:'active'});
            if (!progress) {
                throw new Error('Progress not found');
            }
    
          
    
            if (progress.status) {
                habit.sucsess += 1;
                habit.fails = 0;
                habit.progress = (habit.sucsess) / habit.repeats;
                progress.streak += 1;
            } else {
                habit.fails += 1;
                progress.streak = 0;
            }
    
                progress.date = new Date();
                progress.status = false;

            if (habit.repeats === progress.streak || habit.repeats === habit.sucsess) {
                habit.status = Status.Completed;
                progress.progressStatus = 'expired';
            } else if (habit.repeats === habit.fails) {
                habit.status = Status.Failed;
                 progress.progressStatus = 'expired';
            }

            await habit.save();
            await progress.save();
    
            return progress;
        } catch (error) {
            console.error('Error updating progress:', error);
            return null;
        }
    }
      
    
}
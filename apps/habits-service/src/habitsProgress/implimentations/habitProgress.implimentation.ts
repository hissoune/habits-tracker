import { InjectModel } from "@nestjs/mongoose";
import { HabitProgressInterface } from "../interfaces/habitProgress.interface";
import { HabitProgress } from "../schemas/habitProgress.schema";
import { Model } from "mongoose";
import { Habit } from "../../schemas/habit.schema";
import { NotFoundException } from "@nestjs/common";




export class HabitProgressImplimentation implements HabitProgressInterface 
{
    constructor(  
        @InjectModel(Habit.name) private readonly habitModel:Model<Habit>,
        @InjectModel(HabitProgress.name) private readonly habitProgressModel:Model<HabitProgress>){}


    async getProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        const progress = await this.habitProgressModel.findOne({ habitId, userId });
        
        return progress
    }
   async compleeteProgress(id:string,userId:string){
        const progress = await this.habitProgressModel.findById(id);
       
        if(progress && progress.userId == userId){
                return this.habitProgressModel.findByIdAndUpdate(id,{$set:{status:true}},{new:true})

        }
        throw new NotFoundException('ghjkomilhukgjff')
    }
    createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> {
        const progress = new this.habitProgressModel({
            habitId,
            userId,
            date:Date.now(),
            streak,
            lastUpdated: new Date(),
          });
        
          return progress.save(); 
        
        
    }

  async  updateProgress(habitId: string, userId: string): Promise<HabitProgress | null> {
        const habit =await this.habitModel.findById(habitId)
     
        const progress = await this.habitProgressModel.findOne({ habitId, userId });

        if ( habit.repeats == progress.streak ) {
            await  progress.deleteOne();
            progress.save()
            return this.habitModel.findByIdAndUpdate(habitId, {$set:{status:"completed"}})
        }else if (habit.repeats == habit.fails) {
            await  progress.deleteOne();
            progress.save()
            return this.habitModel.findByIdAndUpdate(habitId, {$set:{status:"failed"}})

        }
        else if (habit.repeats == habit.sucsess) {
            await  progress.deleteOne();
            progress.save()
            return this.habitModel.findByIdAndUpdate(habitId, {$set:{status:"completed"}})

        }

        if ( progress.status == true) {
          await  this.habitModel.findByIdAndUpdate(habitId, {$inc:{sucsess:1},$set:{progress:((habit.sucsess + 1) / habit.repeats),fails:0}})
           return this.habitProgressModel.findOneAndUpdate(
          { habitId, userId },
          { $inc: { streak: 1 }, $set: { lastUpdated: new Date() ,status:false}},
          { new: true }
        );
        }else if( progress.status == false){
             await this.habitModel.findByIdAndUpdate(habitId, {$inc:{fails:1}})

             return this.habitProgressModel.findOneAndUpdate(
                { habitId, userId },
                {  $set: {streak: 0, lastUpdated: new Date(),status:false} },
                { new: true }
              );

              

    }
        }
      
    
}
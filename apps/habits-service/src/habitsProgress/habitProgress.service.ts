import { Injectable } from "@nestjs/common";
import { HabitProgressImplimentation } from "../business/impl/habitProgress.implimentation";
import { HabitProgress } from "../schemas/habitProgress.schema";
import { Habit } from "../schemas/habit.schema";
import { HabitsGateway } from "../gateway/habits.gateway";

@Injectable()
export class HabitProgressService {


    constructor(private readonly habitProgressimlimentatin:HabitProgressImplimentation,private readonly habitsGateway: HabitsGateway){}

    async compleeteProgress(id:string,userId:string){
        return this.habitProgressimlimentatin.compleeteProgress(id,userId)
    }
    async getProgress(habitId: string, userId: string): Promise<HabitProgress | null>{
       
        
       return   this.habitProgressimlimentatin.getProgress(habitId, userId);
     
        
        
    }

    async createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> {
        const progress = await this.habitProgressimlimentatin.createProgress(habitId, userId, streak);
        const data = {
            progress:progress,
            habit:null,
        }
        this.habitsGateway.emitHabitUpdate(data)
        return progress
    }

    async updateProgress(habitId: string, userId: string): Promise<{ progress: HabitProgress, habit: Habit } | null>{
        const data = await this.habitProgressimlimentatin.updateProgress(habitId, userId);
         this.habitsGateway.emitHabitUpdate(data)
        return data
    }
}
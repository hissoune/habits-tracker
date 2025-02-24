import { Injectable } from "@nestjs/common";
import { HabitProgressImplimentation } from "./implimentations/habitProgress.implimentation";
import { HabitProgress } from "./schemas/habitProgress.schema";

@Injectable()
export class HabitProgressService {


    constructor(private readonly habitProgressimlimentatin:HabitProgressImplimentation){}

    async compleeteProgress(id:string,userId:string){
        return this.habitProgressimlimentatin.compleeteProgress(id,userId)
    }
    async getProgress(habitId: string, userId: string): Promise<HabitProgress | null>{
  return this.habitProgressimlimentatin.getProgress(habitId, userId)
    }

    async createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> {
        return this.habitProgressimlimentatin.createProgress(habitId, userId, streak)
    }

    async updateProgress(habitId: string, userId: string): Promise<HabitProgress | null>{
        return this.habitProgressimlimentatin.updateProgress(habitId, userId)
    }
}
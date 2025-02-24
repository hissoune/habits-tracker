import { HabitProgress } from "../schemas/habitProgress.schema"


export interface HabitProgressInterface {
     getProgress(habitId: string, userId: string): Promise<HabitProgress | null> 
     createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> 
     updateProgress(habitId: string, userId: string): Promise<HabitProgress | null>
}
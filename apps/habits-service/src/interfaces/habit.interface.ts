import { HabitProgress } from "../habitsProgress/habitProgress.schema";
import { Habit } from "../schemas/habit.schema";


export interface HabitInterface {
    createHabit(habit: Habit): Promise<Habit>;
    getHabitById(id: string): Promise<Habit | null>;
    updateHabit(id: string, habit: Partial<Habit>): Promise<Habit | null>;
    deleteHabit(id: string): Promise<boolean>;
    getAllHabits(): Promise<Habit[]>;
    getHabitsByFrequency(frequency: string):Promise<Habit[]>
    getProgress(habitId: string, userId: string): Promise<HabitProgress | null> 
    createProgress(habitId: string, userId: string, streak: number): Promise<HabitProgress> 
    updateProgress(habitId: string, userId: string): Promise<HabitProgress | null>
}
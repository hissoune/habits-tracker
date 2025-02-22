import { Habit } from "../schemas/habit.schema";


export interface HabitInterface {
    createHabit(habit: Habit): Promise<Habit>;
    getHabitById(id: string): Promise<Habit | null>;
    updateHabit(id: string, habit: Partial<Habit>): Promise<Habit | null>;
    deleteHabit(id: string): Promise<boolean>;
    getAllHabits(): Promise<Habit[]>;
}
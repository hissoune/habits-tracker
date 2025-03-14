import { Habit } from "../schemas/habit.schema";


export interface HabitsService {
    createHabit(habit: Habit): Promise<Habit>;
    getHabitById(id: string): Promise<Habit | null>;
    updateHabit(id: string, habit: Partial<Habit>): Promise<Habit | null>;
    reactiveHabit(id:string): Promise<Habit | null>;
    deleteHabit(id: string): Promise<boolean>;
    getAllHabits(userId:string): Promise<Habit[]>;
    getAllHabitsForAdmin(): Promise<Habit[]>;
    getHabitsByFrequency(frequency: string):Promise<Habit[]>;

}
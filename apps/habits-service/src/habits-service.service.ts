import { Injectable } from '@nestjs/common';
import { HabitImplementations } from './implimentations/habit.implimentations';

@Injectable()
export class HabitsServiceService {
    constructor(private readonly habitsImplimentations: HabitImplementations) {}
  
  createHabit(habit) {
    return this.habitsImplimentations.createHabit(habit);
  }
}

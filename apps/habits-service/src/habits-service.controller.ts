import { Controller, Get } from '@nestjs/common';
import { HabitsServiceService } from './habits-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Habit } from './schemas/habit.schema';

@Controller()
export class HabitsServiceController {
  constructor(private readonly habitsServiceService: HabitsServiceService) {}

  @MessagePattern("createHabit")
  createHabit(@Payload() data:Habit): string {
    return this.habitsServiceService.getHello();
  }
}
// @MessagePattern("getHabits")
// getHabits() {
//   return this.habitsServiceService.getHabits();
// }

// @MessagePattern("getHabitById")
// getHabitById(id: string)g {
//   return this.habitsServiceService.getHabitById(id);
// }

// @MessagePattern("updateHabit")
// updateHabit(data: { id: string, habit: any }): string {
//   return this.habitsServiceService.updateHabit(data.id, data.habit);
// }

// @MessagePattern("deleteHabit")
// deleteHabit(id: string): string {
//   return this.habitsServiceService.deleteHabit(id);
// }
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Habit } from '../schemas/habit.schema';
import { HabitProgress } from '../schemas/habitProgress.schema';

@WebSocketGateway({ cors: true })
export class HabitsGateway {
  @WebSocketServer()
  server: Server;

  emitHabitUpdate(data:{progress?:HabitProgress,habit?:Habit}) {
 
    
    this.server.emit('habitUpdated', data);
  }
}

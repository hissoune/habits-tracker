import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Progress } from '../schemas/progress.schema';
import { Challenge } from '../schemas/chalenge.schema';


@WebSocketGateway({ cors: true })
export class chalengesGateway {
  @WebSocketServer()
  server: Server;

  emitchalengeUpdate(data:{progress?:Progress,chalenge?:Challenge}) {
 
    
    this.server.emit('chalengeUpdated', data);
  }
}

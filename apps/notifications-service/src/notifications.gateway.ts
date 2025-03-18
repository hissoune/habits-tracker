import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) 
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotificationToClient(notification: { title: string; message: string }) {
    console.log("📢 Envoi de notification WebSocket :", notification);
    this.server.emit('notification', notification); 
  }

  @SubscribeMessage('clientMessage')
  handleMessage(@MessageBody() data: { message: string }) {
    console.log('Message reçu du client :', data.message);
  }
}
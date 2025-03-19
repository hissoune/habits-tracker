import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:8081' } })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

 

  sendNotificationToClient(notification: { title: string; message: string }) {
    
    this.server.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
      
        socket.on('disconnect', (reason) => {
          console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
        });
      });
    console.log("📢 Envoi de notification WebSocket :", notification);
    this.server.emit('notification', notification); 
  }

  @SubscribeMessage('clientMessage')
  handleMessage(@MessageBody() data: { message: string }) {
    console.log('Message reçu du client :', data.message);
  }
}
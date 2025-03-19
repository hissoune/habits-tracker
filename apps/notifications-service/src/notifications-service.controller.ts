import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsServiceService } from './notifications-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsServiceController {
  constructor(private readonly notificationsServiceService: NotificationsServiceService) {}
@Get('health')
checkHealth(){
  return 'UP'
}

@Post('token')
async storePushToken(@Body() body: { userId: string; pushToken: string }) {
  
  return this.notificationsServiceService.saveUserPushToken(body.userId, body.pushToken);
}

  @EventPattern('send')
  async sendNotification(@Payload() body: { token: string; title: string; message: string }) {
    return this.notificationsServiceService.sendNotification(body.token, body.title, body.message);
  }

  @EventPattern('habit_updated') 
  async handleHabitUpdate(@Payload() data: { userId: string; habitId: string; progress: number; title: string; message: string }) {
    console.log('🔥 Received habit update event:', data);

    const userPushToken = await this.notificationsServiceService.getUserPushToken(data?.userId);
    console.log('the push token ',userPushToken);
    

    if (userPushToken) {
      await this.notificationsServiceService.sendNotification(userPushToken, data.title, data.message);
      console.log('✅ Notification sent');
    } else {
      console.error('❌ User push token not found');
    }
  }

  @EventPattern('chalenge_updated') 
  async handleChalengeUpdate(@Payload() data: { userId: string; chalengeTitle: string; progress: number; title: string; message: string }) {
    console.log('🔥 Received chalenge update event:', data);

    const userPushToken = await this.notificationsServiceService.getUserPushToken(data?.userId);
    console.log('the push token ',userPushToken);

    if (userPushToken) {
      await this.notificationsServiceService.sendNotification(userPushToken, data.title, data.message);
      console.log('✅ Notification sent');
    } else {
      console.error('❌ User push token not found');
    }
  }
}

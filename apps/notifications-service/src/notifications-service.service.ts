import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notifications.gateway';
import axios from 'axios';

@Injectable()
export class NotificationsServiceService {
  private EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
  private userPushTokens = new Map<string, string>();
  constructor(private notificationGateway: NotificationGateway) {}

  async saveUserPushToken(userId: string, pushToken: string) {
    this.userPushTokens.set(userId, pushToken);
    console.log(`Stored token for user ${userId}: ${pushToken}`);
    return { success: true, message: 'Push token saved successfully' };
  }

  async sendNotification(pushToken: string, title: string, body: string) {
    if (!pushToken.startsWith('ExponentPushToken')) {
      throw new Error('Token de notification invalide');
    }

    const message = { to: pushToken, sound: 'default', title, body };

    await axios.post(this.EXPO_PUSH_URL, message);

    this.notificationGateway.sendNotificationToClient({ title, message: body });

    return { success: true, message: 'Notification envoyée !' };
  }

  async getUserPushToken(userId: string) {
    return this.userPushTokens.get(userId) || null;
  }
}

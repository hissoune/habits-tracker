import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { PushToken } from './schemas/notificationsPushToken';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsServiceService {
  private EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

  constructor( @InjectModel(PushToken.name) private pushTokenModel: Model<PushToken>,
) {}

async saveUserPushToken(userId: string, pushToken: string) {
  await this.pushTokenModel.findOneAndUpdate(
    { userId },
    { pushToken },
    { upsert: true, new: true }
  );

  console.log(`Stored token for user ${userId}: ${pushToken}`);
  return { success: true, message: 'Push token saved successfully' };
}

async sendNotification(pushToken: string, title: string, body: string) {



  if (!pushToken.startsWith('ExponentPushToken')) {
    throw new Error('Invalid notification token');
  }

  console.log('push tokeb befor sending the req ',pushToken);
  
  const message = {
    to: pushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { extraData: 'Some extra data' }, 
  };
  
  const response = await axios.post(this.EXPO_PUSH_URL, message,{
    headers: {
      "Content-Type": "application/json",
  },
  });
  console.log("Expo Push Response:", response.data);
 
  return { success: true, message: 'Notification sent!' };
}


async getUserPushToken(userId: string) {
  const userPushToken = await this.pushTokenModel.findOne({ userId });
  return userPushToken ? userPushToken.pushToken : null;
}
}

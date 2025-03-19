import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsServiceService } from './notifications-service.service';
import { NotificationGateway } from './notifications.gateway';
import { getModelToken } from '@nestjs/mongoose';
import { PushToken } from './schemas/notificationsPushToken';
import { Model } from 'mongoose';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('NotificationsServiceService', () => {
  let service: NotificationsServiceService;
  let notificationGateway: NotificationGateway;
  let pushTokenModel: Model<PushToken>;
  let axiosMock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsServiceService,
        {
          provide: NotificationGateway,
          useValue: {
            sendNotificationToClient: jest.fn(),
          },
        },
        {
          provide: getModelToken(PushToken.name),
          useValue: {
            findOneAndUpdate: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsServiceService>(NotificationsServiceService);
    notificationGateway = module.get<NotificationGateway>(NotificationGateway);
    pushTokenModel = module.get<Model<PushToken>>(getModelToken(PushToken.name));

    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset(); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveUserPushToken', () => {
    it('should save or update the push token for a user', async () => {
      const userId = 'user1';
      const pushToken = 'ExponentPushToken[12345]';

      (pushTokenModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
        userId,
        pushToken,
      });

      const result = await service.saveUserPushToken(userId, pushToken);

      expect(pushTokenModel.findOneAndUpdate).toHaveBeenCalledWith(
        { userId },
        { pushToken },
        { upsert: true, new: true },
      );
      expect(result).toEqual({
        success: true,
        message: 'Push token saved successfully',
      });
    });
  });

  describe('sendNotification', () => {
    it('should send a notification and return success', async () => {
      const pushToken = 'ExponentPushToken[12345]';
      const title = 'Test Title';
      const body = 'Test Body';

      // Mock the axios POST request
      axiosMock.onPost('https://exp.host/--/api/v2/push/send').reply(200, {
        status: 'ok',
      });

      const result = await service.sendNotification(pushToken, title, body);

      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].data).toEqual(
        JSON.stringify({
          to: pushToken,
          sound: 'default',
          title: title,
          body: body,
          data: { extraData: 'Some extra data' },
        }),
      );
      expect(notificationGateway.sendNotificationToClient).toHaveBeenCalledWith({
        title,
        message: body,
      });
      expect(result).toEqual({
        success: true,
        message: 'Notification sent!',
      });
    });

    it('should throw an error if the push token is invalid', async () => {
      const pushToken = 'InvalidToken';
      const title = 'Test Title';
      const body = 'Test Body';

      await expect(
        service.sendNotification(pushToken, title, body),
      ).rejects.toThrow('Invalid notification token');
    });
  });

  describe('getUserPushToken', () => {
    it('should return the push token for a user', async () => {
      const userId = 'user1';
      const pushToken = 'ExponentPushToken[12345]';

      (pushTokenModel.findOne as jest.Mock).mockResolvedValue({
        userId,
        pushToken,
      });

      const result = await service.getUserPushToken(userId);

      expect(pushTokenModel.findOne).toHaveBeenCalledWith({ userId });
      expect(result).toBe(pushToken);
    });

    it('should return null if the user does not have a push token', async () => {
      const userId = 'user1';

      (pushTokenModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.getUserPushToken(userId);

      expect(pushTokenModel.findOne).toHaveBeenCalledWith({ userId });
      expect(result).toBeNull();
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';
import { NotificationGateway } from './notifications.gateway';

describe('NotificationsServiceController', () => {
  let notificationsServiceController: NotificationsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsServiceController],
      providers: [NotificationsServiceService,NotificationGateway],
    }).compile();

    notificationsServiceController = app.get<NotificationsServiceController>(NotificationsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationsServiceController.checkHealth()).toBe('UP');
    });
  });
});

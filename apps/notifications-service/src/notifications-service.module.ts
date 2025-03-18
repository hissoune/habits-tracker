import { Module } from '@nestjs/common';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';
import { NotificationGateway } from './notifications.gateway';

@Module({
  imports: [
     
  ],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService,NotificationGateway],
})
export class NotificationsServiceModule {}

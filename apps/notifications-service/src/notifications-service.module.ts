import { Module } from '@nestjs/common';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PushToken, PushTokenSchema } from './schemas/notificationsPushToken';
import notificationConfig from './config/config'
@Module({
  imports: [
      ConfigModule.forRoot({
               isGlobal: true,
               load: [notificationConfig], 
             }),
     
             MongooseModule.forFeature([{ name: PushToken.name, schema: PushTokenSchema }]),
         
             MongooseModule.forRootAsync({
               imports: [ConfigModule],
               inject: [ConfigService],
               useFactory: (configService: ConfigService) => ({
                 uri: configService.get<string>('app.mongourl'),
                
               }),
             }),
  ],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService],
})
export class NotificationsServiceModule {}

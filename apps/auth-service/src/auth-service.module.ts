import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthConfig from './config/config';
import { AuthServiceService } from './auth-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModelSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthImplementation } from './implementations/auth.implementation';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AuthConfig], 
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('app.mongourl'),
       
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret'), 
        signOptions: { expiresIn: '1000h' },
      })
      
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_EMAIL_PASS,
        },
      },
      defaults: {
        from: `"${process.env.APP_EMAIL_USERNAME}" <${process.env.APP_EMAIL}>`,
      },
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService,AuthImplementation],
})
export class AuthServiceModule {}

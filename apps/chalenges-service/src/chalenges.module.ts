import { Module } from '@nestjs/common';
import { ChalengesController } from './chalenges.controller';
import { ChalengesService } from './chalenges.service';
import { AuthguardGuard } from './authguard/authguard.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import chalengeConfig from './config/config'
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schemas/chalenge.schema';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { ProgressModule } from './chalengesProgress/progress.module';
import { CronService } from './cronJobs/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { chalengesGateway } from './gateway/chalenges.gateway';
import { Progress, progressSchema } from './schemas/progress.schema';
@Module({

  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [chalengeConfig], 
    }),

    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema },{ name: Progress.name, schema: progressSchema }]),

    MongooseModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('app.mongourl'),
              
              }),
            }),
            ScheduleModule.forRoot(),

    ClientsModule.register([
                  {
                    name:"AUTH_SERVICE",
                    transport:Transport.RMQ,
                    options:{
                      urls:["amqp://localhost:5672/"],
                      queue:"auth_queue",
                      queueOptions: {
                        durable: false,
                      },
                    }
                  }
                ]),
                ProgressModule

  ],
  controllers: [ChalengesController],
  providers: [ChalengesService,AuthguardGuard,ChalengeServiceImplimentation,CronService,chalengesGateway],
})
export class ChalengesModule {}

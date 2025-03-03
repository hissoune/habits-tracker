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
@Module({

  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [chalengeConfig], 
    }),

    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }]),

    MongooseModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('app.mongourl'),
              
              }),
            }),

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
  providers: [ChalengesService,AuthguardGuard,ChalengeServiceImplimentation],
})
export class ChalengesModule {}

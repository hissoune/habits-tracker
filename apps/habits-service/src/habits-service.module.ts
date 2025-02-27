import { Module } from '@nestjs/common';
import { HabitsController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  habitConfig  from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  Habit, HabitSchema } from './schemas/habit.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { HabitProgress, HabitProgressSchema } from './schemas/habitProgress.schema';
import { habitProgressModule } from './habitsProgress/habitProgress.module';
import { HabitProgressService } from './habitsProgress/habitProgress.service';
import { HabitProgressImplimentation } from './business/impl/habitProgress.implimentation';
import { HabitsServiceImpl } from './business/impl/habits-service-impl';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HabitsGateway } from './gateway/habits.gateway';

@Module({
  imports: [
     ConfigModule.forRoot({
          isGlobal: true,
          load: [habitConfig], 
        }),

        MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema },{ name: HabitProgress.name, schema: HabitProgressSchema }]),
    
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('app.mongourl'),
           
          }),
        }),
        ScheduleModule.forRoot(),
        habitProgressModule,
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
            

  ],
  controllers: [HabitsController],
  providers: [HabitsServiceService,HabitsServiceImpl,HabitProgressService,HabitProgressImplimentation,HabitsGateway],
})
export class HabitsServiceModule {}

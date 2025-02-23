import { Module } from '@nestjs/common';
import { HabitsServiceController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  habitConfig  from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  Habit, HabitSchema } from './schemas/habit.schema';
import { HabitImplementations } from './implimentations/habit.implimentations';
import { ScheduleModule } from '@nestjs/schedule';
import { HabitProgress, HabitProgressSchema } from './habitsProgress/habitProgress.schema';

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
  ],
  controllers: [HabitsServiceController],
  providers: [HabitsServiceService,HabitImplementations],
})
export class HabitsServiceModule {}

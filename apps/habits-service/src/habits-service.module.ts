import { Module } from '@nestjs/common';
import { HabitsServiceController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  habitConfig  from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  Habit, HabitSchema } from './schemas/habit.schema';
import { HabitImplementations } from './implimentations/habit.implimentations';

@Module({
  imports: [
     ConfigModule.forRoot({
          isGlobal: true,
          load: [habitConfig], 
        }),
        MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
    
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('app.mongourl'),
           
          }),
        }),
  ],
  controllers: [HabitsServiceController],
  providers: [HabitsServiceService,HabitImplementations],
})
export class HabitsServiceModule {}

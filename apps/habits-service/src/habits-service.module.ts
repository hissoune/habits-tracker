import { Module } from '@nestjs/common';
import { HabitsServiceController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  habitConfig  from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import {  HabitModel, HabitSchema } from './schemas/habit.schema';

@Module({
  imports: [
     ConfigModule.forRoot({
          isGlobal: true,
          load: [habitConfig], 
        }),
        MongooseModule.forFeature([{ name: HabitModel.name, schema: HabitSchema }]),
    
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('app.mongourl'),
           
          }),
        }),
  ],
  controllers: [HabitsServiceController],
  providers: [HabitsServiceService],
})
export class HabitsServiceModule {}

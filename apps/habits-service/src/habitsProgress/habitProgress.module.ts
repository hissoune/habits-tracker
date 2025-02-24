import { Module } from '@nestjs/common';
import { HabitProgressController } from './habitProgress.controller';
import { HabitProgressService } from './habitProgress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from '../schemas/habit.schema';
import { HabitProgress, HabitProgressSchema } from './schemas/habitProgress.schema';
import { HabitProgressImplimentation } from './implimentations/habitProgress.implimentation';







@Module({
    imports: [
     MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema },{ name: HabitProgress.name, schema: HabitProgressSchema }]),
        
    ],
    controllers: [
        HabitProgressController
    ],
    providers:[HabitProgressService,HabitProgressImplimentation],

})

export class habitProgressModule {}
import { Module } from '@nestjs/common';
import { HabitProgressController } from './habitProgress.controller';
import { HabitProgressService } from './habitProgress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Habit, HabitSchema } from '../schemas/habit.schema';
import { HabitProgress, HabitProgressSchema } from '../schemas/habitProgress.schema';
import { HabitProgressImplimentation } from '../business/impl/habitProgress.implimentation';
import { ClientsModule, Transport } from '@nestjs/microservices';







@Module({
    imports: [
     MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema },{ name: HabitProgress.name, schema: HabitProgressSchema }]),
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
    controllers: [
        HabitProgressController
    ],
    providers:[HabitProgressService,HabitProgressImplimentation],

})

export class habitProgressModule {}
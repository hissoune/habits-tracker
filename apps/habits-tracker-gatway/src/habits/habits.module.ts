import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
          {
            name:"HABITS_SERVICE",
            transport:Transport.RMQ,
            options:{
              urls:["amqp://localhost:5672/"],
              queue:"auth_queue",
              queueOptions: {
                durable: false,
              },
            }
          }
        ])
  ],
  controllers: [HabitsController],
  providers: [HabitsService],
 
})
export class HabitsModule {}

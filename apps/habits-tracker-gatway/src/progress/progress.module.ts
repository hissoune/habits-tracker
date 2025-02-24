import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
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
                  queue:"habit_queue",
                  queueOptions: {
                    durable: false,
                  },
                }
              }
            ])
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}

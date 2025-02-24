import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { AuthguardGuard } from './authguard/authguard.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
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
    
    HabitsModule, AuthModule, ProgressModule],
  controllers: [AppController],
  providers: [AppService,AuthguardGuard],
})
export class AppModule {}

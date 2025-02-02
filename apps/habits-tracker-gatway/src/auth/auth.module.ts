import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { NestFactory } from '@nestjs/core';
import { HabitsServiceModule } from './habits-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HabitsServiceModule, {
     transport: Transport.RMQ,
     options: {
       urls: ["amqp://localhost:5672/"],
       queue: 'habit_queue',
       queueOptions: {
         durable: false,
       },
     },
   });  await app.listen();
}
bootstrap();

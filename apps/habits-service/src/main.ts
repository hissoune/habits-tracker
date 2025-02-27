import { NestFactory } from '@nestjs/core';
import { HabitsServiceModule } from './habits-service.module';
const Consul = require('consul');
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(HabitsServiceModule);
  
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(HabitsServiceModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ["amqp://localhost:5672/"],
  //     queue: 'habit_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  const consul = new Consul();
  const serviceName = 'habits-service';
  const port = 3001; 

  await consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: port,
    check: {
      http: `http://127.0.0.1:3001/habits/health`, 
      interval: '10s',         
    },
  });
  console.log(`✅ Registered ${serviceName} in Consul`);

  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ChalengesModule } from './chalenges.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const Consul = require('consul');

async function bootstrap() {
  const app = await NestFactory.create(ChalengesModule);
  const microcervice = await NestFactory.createMicroservice<MicroserviceOptions>(ChalengesModule, {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672/"],
        queue: 'chalenge_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  await microcervice.listen();
  const consul = new Consul();
  const serviceName = 'chalenges-service';
  const port = 3003; 

  await consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: port,
    check: {
      http: `http://localhost:3003/chalenges/health`, 
      interval: '10s',         
    },
  });
  console.log(`✅ Registered ${serviceName} in Consul`);
  await app.listen(port);
}
bootstrap();

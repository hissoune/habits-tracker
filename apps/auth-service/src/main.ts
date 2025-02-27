import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const Consul = require('consul');

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AuthServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://localhost:5672/"],
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
    await microservice.listen();


    const consul = new Consul();

  const serviceName = 'auth-service';
  const port = 3002; 

  await consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: port,
    check: {
      http: `http://127.0.0.1:3002/auth/health`, 
      interval: '10s',  
      timeout: '5s',
    },
  });
  console.log(`✅ Registered ${serviceName} in Consul`);

  await app.listen(port); 
}
bootstrap();

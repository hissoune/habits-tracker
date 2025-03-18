import { NestFactory } from '@nestjs/core';
import { NotificationsServiceModule } from './notifications-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const Consul = require('consul');

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);
  const microcervice = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsServiceModule, {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://localhost:5672/"],
        queue: 'notifications_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

    await microcervice.listen();

    const consul = new Consul();
    const serviceName = 'notifications-service';
    const port = 3006; 

    await consul.agent.service.register({

      name: serviceName,
      address: 'localhost',
      port: port,
      check: {
        http: `http://127.0.0.1:3006/notifications/health`, 
        interval: '10s',         
      },
    });
    console.log(`✅ Registered ${serviceName} in Consul`);

  await app.listen(port);
}
bootstrap();

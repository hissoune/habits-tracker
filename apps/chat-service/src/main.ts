import { NestFactory } from '@nestjs/core';
import { ChatServiceModule } from './chat-service.module';
const Consul = require('consul');

async function bootstrap() {
  const app = await NestFactory.create(ChatServiceModule);
  const consul = new Consul();
  const serviceName = 'chat-service';
  const port = 3005; 

  await consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: port,
    check: {
      http: `http://127.0.0.1:3005/chats/health`, 
      interval: '10s',         
    },
  });
  console.log(`✅ Registered ${serviceName} in Consul`);

  await app.listen(port);
}
bootstrap();

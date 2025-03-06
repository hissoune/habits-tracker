import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const Consul = require('consul');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const consul = new Consul();
  const serviceName = 'gateway-service';
  const port = 5000; 
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  });
  await consul.agent.service.register({
    name: serviceName,
    address: 'localhost',
    port: port,
  });
  console.log(`✅ Registered ${serviceName} in Consul`);

  await app.listen( port);
}
bootstrap();
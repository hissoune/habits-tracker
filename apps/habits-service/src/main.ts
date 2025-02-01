import { NestFactory } from '@nestjs/core';
import { HabitsServiceModule } from './habits-service.module';

async function bootstrap() {
  const app = await NestFactory.create(HabitsServiceModule);
  await app.listen(process.env.port ?? 8000);
}
bootstrap();

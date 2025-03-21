import { NestFactory } from "@nestjs/core"
import { HabitsServiceModule } from "./habits-service.module"
const Consul = require("consul")
import { Transport, type MicroserviceOptions } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.create(HabitsServiceModule)

  const microcervice = await NestFactory.createMicroservice<MicroserviceOptions>(HabitsServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672/"],
      queue: "habit_queue",
      queueOptions: {
        durable: false,
      },
    },
  })
  await microcervice.listen()

  console.log(`Connecting to Consul at ${process.env.CONSUL_HOST || "localhost"}:${process.env.CONSUL_PORT || "8500"}`)

  const consul = new Consul()

  const serviceName = "habits-service"
  const port = 3001

  await consul.agent.service.register({
    name: serviceName,
    address: process.env.SERVICE_ADDRESS || "habits-service", 
    port: port,
    check: {
      http: `http://${process.env.SERVICE_ADDRESS || "localhost"}:${port}/habits/health`, 
      interval: "10s",
    },
  })
  console.log(`✅ Registered ${serviceName} in Consul`)

  await app.listen(port)
}
bootstrap()



import { NestFactory } from "@nestjs/core"
import { NotificationsServiceModule } from "./notifications-service.module"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"
const Consul = require("consul")

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule)
  const microcervice = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672/"],
      queue: "notifications_queue",
      queueOptions: {
        durable: false,
      },
    },
  })

  await microcervice.listen()

  console.log(`Connecting to Consul at ${process.env.CONSUL_HOST || "localhost"}:${process.env.CONSUL_PORT || "8500"}`)

  const consul = new Consul()

  const serviceName = "notifications-service"
  const port = 3006

  await consul.agent.service.register({
    name: serviceName,
    address: process.env.SERVICE_ADDRESS || "notifications-service", 
    port: port,
    check: {
      http: `http://${process.env.SERVICE_ADDRESS || "localhost"}:${port}/notifications/health`, 
      interval: "10s",
    },
  })
  console.log(`✅ Registered ${serviceName} in Consul`)

  await app.listen(port)
}
bootstrap()


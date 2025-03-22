import { NestFactory } from "@nestjs/core"
import { AuthServiceModule } from "./auth-service.module"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"
const Consul = require("consul")

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule)

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AuthServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672/"],
      queue: "auth_queue",
      queueOptions: {
        durable: false,
      },
    },
  })
  await microservice.listen()

  console.log(`Connecting to Consul at ${process.env.CONSUL_HOST || "localhost"}:${process.env.CONSUL_PORT || "8500"}`)

  const consul = new Consul()

  const serviceName = "auth-service"
  const port = 3002

  await consul.agent.service.register({
    name: serviceName,
    address: process.env.SERVICE_ADDRESS || "localhost", 
    port: port,
    check: {
      http: `http://${process.env.SERVICE_ADDRESS || "localhost"}:${port}/auth/health`, 
      interval: "10s",
    },
  })
  console.log(`✅ Registered ${serviceName} in Consul`)

  await app.listen(port)
}
bootstrap()


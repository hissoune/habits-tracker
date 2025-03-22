import { NestFactory } from "@nestjs/core"
import { ChalengesModule } from "./chalenges.module"
import { type MicroserviceOptions, Transport } from "@nestjs/microservices"
const Consul = require("consul")

async function bootstrap() {
  const app = await NestFactory.create(ChalengesModule)
  const microcervice = await NestFactory.createMicroservice<MicroserviceOptions>(ChalengesModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672/"],
      queue: "chalenge_queue",
      queueOptions: {
        durable: false,
      },
    },
  })
  await microcervice.listen()

  console.log(`Connecting to Consul at ${process.env.CONSUL_HOST || "localhost"}:${process.env.CONSUL_PORT || "8500"}`)

  const consul = new Consul()

  const serviceName = "chalenges-service"
  const port = 3003

  await consul.agent.service.register({
    name: serviceName,
    address: process.env.SERVICE_ADDRESS || "localhost", 
    port: port,
    check: {
      http: `http://${process.env.SERVICE_ADDRESS || "localhost"}:${port}/chalenges/health`, 
      interval: "10s",
    },
  })
  console.log(`✅ Registered ${serviceName} in Consul`)
  await app.listen(port)
}
bootstrap()


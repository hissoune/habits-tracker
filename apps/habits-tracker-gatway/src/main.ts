import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
const Consul = require("consul")

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Log the Consul host and port for debugging
  console.log(`Connecting to Consul at ${process.env.CONSUL_HOST || "localhost"}:${process.env.CONSUL_PORT || "8500"}`)

  const consul = new Consul()

  const serviceName = "gateway-service"
  const port = 5000
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
  await consul.agent.service.register({
    name: serviceName,
    address: process.env.SERVICE_ADDRESS || "localhost", // Use the service name
    port: port,
    // check: {
    //   http: `http://${process.env.SERVICE_ADDRESS || 'gateway-service'}:${port}/health`, // Use the service name
    //   interval: '10s',
    // },
  })
  console.log(`✅ Registered ${serviceName} in Consul`)

  await app.listen(port)
}
bootstrap()


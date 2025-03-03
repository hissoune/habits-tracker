import { Module } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";
import { AuthguardGuard } from "../authguard/authguard.guard";
import { ConfigModule } from "@nestjs/config";
import chalengeConfig from '../config/config'
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { Progress, progressSchema } from "../schemas/progress.schema";


@Module({
    imports:[
        ConfigModule.forRoot({
              isGlobal: true,
              load: [chalengeConfig], 
            }),
                MongooseModule.forFeature([{ name: Progress.name, schema: progressSchema }]),
            
            ClientsModule.register([
                              {
                                name:"AUTH_SERVICE",
                                transport:Transport.RMQ,
                                options:{
                                  urls:["amqp://localhost:5672/"],
                                  queue:"auth_queue",
                                  queueOptions: {
                                    durable: false,
                                  },
                                }
                              }
                            ]),
    ],
    controllers: [
        ProgressController
    ],
    providers: [
        ProgressService,AuthguardGuard
    ],
})
export class ProgressModule {}
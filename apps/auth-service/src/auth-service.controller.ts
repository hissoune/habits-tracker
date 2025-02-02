import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';
import { Date } from 'mongoose';
import { User } from './schemas/user.schema';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern('register')
  register(@Payload() data:User) {
   
   return this.authServiceService.register(data)
  }
}

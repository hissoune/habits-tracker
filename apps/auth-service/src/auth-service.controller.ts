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

  @MessagePattern('login')
  login(@Payload() data:User) {
   
   return this.authServiceService.login(data)
  }

  @MessagePattern('verify')
  verifyToken(@Payload() token:string){
   return this.authServiceService.verifyToken(token)
  }

  @MessagePattern('forgotpassword')
  forgotPassword(@Payload() email:string){
   return this.authServiceService.forgotPassword(email)
  }

  @MessagePattern('resetpassword')
  resetPassword(@Payload() data:{resetToken:string,newPassword:string}){
    return this.authServiceService.resetPassword(data)
  }
}

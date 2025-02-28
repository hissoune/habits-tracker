import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';
import { Date } from 'mongoose';
import { User } from './schemas/user.schema';
import { AuthguardGuard } from './authguard/authguard.guard';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Get('/health')
    checkHealth() {
    return 'UP'
  }

   @Post('register')
   register(@Body() body){
    return this.authService.register(body)
   }
   @Post('login')
   login(@Body() body:{email:string,password:string}){
     
     return this.authService.login(body)
    }
    @Post('forgotpassword')
    forgotPassword(@Body() body:{email:string}){
     return this.authService.forgotPassword(body.email);
    }
 
    @Post('resetpassword')
    resetPassword(@Body() body:{resetToken:string,newPassword:string}){
       return this.authService.resetPassword(body)
    }

    @Get('verify')
       @UseGuards(AuthguardGuard)
       verifyTokenforClient(@Req() req){ 
        
        return  req.user;
       }

       @MessagePattern('verify')
       verifyToken(@Payload() token:string){        
        return this.authService.verifyToken(token)
       }
}

import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';
import { Date } from 'mongoose';
import { User } from './schemas/user.schema';
import { AuthguardGuard } from './authguard/authguard.guard';
import { Roles } from './authguard/roles.decorator';

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

    @Get('all_users')
    @UseGuards(AuthguardGuard)
    getAllUsers(@Req() req){
      const id = req.user.id 
   return this.authService.getAllUsers(id)
    }

    @Patch('/userActivity/:id')
    @UseGuards(AuthguardGuard)
    @Roles('admin')
    banOrUnban(@Param('id') id ){
     
      
        return this.authService.banOrUnban(id)
    }

    @MessagePattern('verify')
    verifyToken(@Payload() token:string){ 

      return this.authService.verifyToken(token)

      }
    @MessagePattern('get-users')
    getUserByIds(@Payload() data){
   
      
      return this.authService.getUsersByIds(data)
    }

    @MessagePattern('get-creator')
    getUserById(@Payload() data){
   
      
      return this.authService.getUserById(data)
    }
}

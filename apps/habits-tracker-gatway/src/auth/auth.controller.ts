import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../../auth-service/src/schemas/user.schema';
import { AuthguardGuard } from '../authguard/authguard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
   verifyToken(@Request() req){ 
    
    return  req.user;
   }
}

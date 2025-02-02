import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body){
   return this.authService.register(body)
  }
  @Post('login')
  login(@Body() body){
    return this.authService.login(body)
   }
   @Post('forgotpassword')
   forgotPassword(@Body() body){
    const {email} = body
    return this.authService.forgotPassword(email);
   }
}

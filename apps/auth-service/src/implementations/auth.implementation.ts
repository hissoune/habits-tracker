import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { AuthInterface } from "../interfaces/auth.interface";
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { comparPassword, hashPassword } from '../helpers/password.helper';

export class AuthImplementation implements AuthInterface {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    // private readonly mailService: MailerService

  ) {}

  async register(userEntity: User): Promise<User> {
   
    userEntity.password = await hashPassword(userEntity.password);

    const createdUser = new this.userModel(userEntity);
    return createdUser.save();
  }

  async login(userEntity: {email:string,password:string}): Promise<{ token: string }> {

    const user = await this.userModel.findOne({ email: userEntity.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await comparPassword(user.password, userEntity.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token =  this.jwtService.sign({ name: user.name, email: user.email ,role:user.role });

   
    return { token };
  }

    async verifyToken(token: string) {
        try {
            
          const decoded = this.jwtService.verify(token); 
          
          const user = await this.userModel.findOne({email:decoded.email}); 
        

          if (!user) throw new UnauthorizedException('User not found');
          
          return { email: user.email };
        } catch (error) {
          throw new UnauthorizedException('Token validation failed');
        }
      }

  async forgotPassword(email: string): Promise<{ email: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }
    // await this.mailService.sendMail({
    //   from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
    //   to: user.email,
    //   subject: `App connected`,
    //   text: `hellow someone got you `,
    // });

    // const resetToken = this.jwtService.sign(
    //   { id: user._id, email: user.email },
    //   { secret: process.env.JWT_SECRET, expiresIn: '1h' }
    // );

    // await this.mailService.sendMail({
    //   from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   text: `Forgot your password? Use this token to reset it: ${resetToken}. If you didn't request a password reset, please ignore this email.`,
    // });

    return { email: user.email };
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }> {
    try {
      const decoded = this.jwtService.verify(resetToken, { secret: process.env.JWT_SECRET });
      const user = await this.userModel.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

     
      user.password = await hashPassword(newPassword);
      await user.save();

      return { message: 'Password has been successfully reset' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }
}

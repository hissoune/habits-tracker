import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthServiceService } from '../auth-service.service';

export interface AuthenticatedRequest extends Request {
  user?: any; 
}
@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(private readonly authService: AuthServiceService){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);
   
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user = await this.authService.verifyToken(token);      
     
      
      if (user) {
        request.user = user;
        
       return true

      }else{
        return false

      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');

    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; 
    }
    return null;
  }
}

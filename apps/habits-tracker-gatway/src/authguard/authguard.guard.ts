import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface AuthenticatedRequest extends Request {
  user?: any; 
}
@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user =  this.authClient.send('verify', token);
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

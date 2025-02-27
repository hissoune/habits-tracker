import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../authguard/authguard.guard';  

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
       
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
     
    const hasRole = requiredRoles.includes(user.role); 

    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}

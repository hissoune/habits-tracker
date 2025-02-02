import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthImplementation } from './implementations/auth.implementation';
import { User } from './schemas/user.schema';


@Injectable()
export class AuthServiceService {
  constructor(private readonly authImplimentations: AuthImplementation) {}
  
register(data:User){
   return this.authImplimentations.register(data)
}
  
}

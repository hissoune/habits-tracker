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

getUsersByIds(ids:string[]){
  return this.authImplimentations.getUsersByIds(ids)
}

getUserById(userId:string){
  console.log(userId);
  
  return this.authImplimentations.getUserById(userId)

}

login(data:{email:string,password:string}){
    return this.authImplimentations.login(data)
}

getAllUsers(id:string){
  return this.authImplimentations.getUsers(id)

}

verifyToken(token:string){
  return this.authImplimentations.verifyToken(token)
}

forgotPassword( email:string){
  return this.authImplimentations.forgotPassword(email)

  }
   resetPassword( data:{resetToken:string,newPassword:string}){
      return this.authImplimentations.resetPassword(data.resetToken, data.newPassword)
    }

  
}

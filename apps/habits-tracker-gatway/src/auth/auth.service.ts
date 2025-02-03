import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy  ){}

    register(data){
        return this.authClient.send('register', data)
    }

    login(data){
        return this.authClient.send('login', data)

    }

    forgotPassword(email:string){
        return this.authClient.send('forgotpassword', email)

    }

    resetPassword(data:{resetToken:string,newPassword:string}){
        return this.authClient.send('resetpassword', data)

    }
}

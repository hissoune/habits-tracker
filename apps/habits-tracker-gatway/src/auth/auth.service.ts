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
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(@Inject("AUTH_SERVICE") private readonly authClient:ClientProxy  ){}

    login(data){
        return this.authClient.send('login', data)
    }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthServiceService {
  constructor(private readonly configService: ConfigService) {}
  

  
}

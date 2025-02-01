import { Injectable } from '@nestjs/common';

@Injectable()
export class HabitsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

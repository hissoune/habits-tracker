import { Controller, Get } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';

@Controller('chats')
export class ChatServiceController {
  constructor(private readonly chatServiceService: ChatServiceService) {}

  @Get('health')
  getHello(): string {
    return 'UP'
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ChalengesService } from './chalenges.service';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { AuthguardGuard } from './authguard/authguard.guard';

@Controller('chalenges')
export class ChalengesController {
  constructor(private readonly chalengesService: ChalengesService) {}

  @Get('health')
  getHello(): string {
    return 'UP';
  }

  @Post()
  @UseGuards(AuthguardGuard)
  createChalenge(@Req() req,@Body() chalenge:CreateChalengeDto){
    chalenge.creator = req.user.id
    console.log(chalenge);
    
    return this.chalengesService.createChalenge(chalenge)
  }
}

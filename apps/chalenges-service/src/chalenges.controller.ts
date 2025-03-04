import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ChalengesService } from './chalenges.service';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { AuthguardGuard } from './authguard/authguard.guard';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('chalenges')
export class ChalengesController {
  constructor(private readonly chalengesService: ChalengesService) {}

  @Get('health')
  getHello(): string {
    return 'UP';
  }

  @Get()
   getAllChalenges(){
    return this.chalengesService.getAllChalenges()
   }

  @Post()
  @UseGuards(AuthguardGuard)
  createChalenge(@Req() req, @Body() chalenge:CreateChalengeDto){
    chalenge.creator = req.user.id
    console.log(chalenge);
    
    return this.chalengesService.createChalenge(chalenge)
  }

  @Patch('/:id')
  @UseGuards(AuthguardGuard)
  updateChalenge(@Req() req,@Param('id') id,@Body() chalenge:UpdateChalengeDto){
    chalenge.creator = req.user.id
    return this.chalengesService.updateChalenge(id, chalenge)
  }
  @Delete('/:id')
  @UseGuards(AuthguardGuard)
  deleteChalenge(@Req() req,@Param('id') id){
    
  }

  
}

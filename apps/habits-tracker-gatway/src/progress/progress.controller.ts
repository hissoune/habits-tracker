import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { AuthguardGuard } from '../authguard/authguard.guard';

@Controller('progress')
@UseGuards(AuthguardGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(createProgressDto);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(+id);
  }

  @Patch('compleet/:id')
  update(@Request() req,@Param('id') id: string) {
    const userId = req.user.id
    
    return this.progressService.update(id,userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressService.remove(+id);
  }
}

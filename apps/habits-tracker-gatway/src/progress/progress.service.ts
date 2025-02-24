import { Inject, Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProgressService {
  constructor(@Inject("HABITS_SERVICE") private readonly habitsClient:ClientProxy){}
  create(createProgressDto: CreateProgressDto) {
    return 'This action adds a new progress';
  }

  findAll() {
    return `This action returns all progress`;
  }

  findOne(habitId: string,userId:string) {
    return this.habitsClient.send('getProgress', {habitId,userId})
  }

  update(id:string,userId:string) {
    return this.habitsClient.send('compleetProgress',{id,userId});
  }

  remove(id: number) {
    return `This action removes a #${id} progress`;
  }
}

import { Module } from '@nestjs/common';
import { HabitsServiceController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';

@Module({
  imports: [],
  controllers: [HabitsServiceController],
  providers: [HabitsServiceService],
})
export class HabitsServiceModule {}

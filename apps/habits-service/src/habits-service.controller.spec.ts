import { Test, TestingModule } from '@nestjs/testing';
import { HabitsServiceController } from './habits-service.controller';
import { HabitsServiceService } from './habits-service.service';

describe('HabitsServiceController', () => {
  let habitsServiceController: HabitsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HabitsServiceController],
      providers: [HabitsServiceService],
    }).compile();

    habitsServiceController = app.get<HabitsServiceController>(HabitsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(habitsServiceController.getHello()).toBe('Hello World!');
    });
  });
});

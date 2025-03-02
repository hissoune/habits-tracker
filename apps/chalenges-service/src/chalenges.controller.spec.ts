import { Test, TestingModule } from '@nestjs/testing';
import { ChalengesController } from './chalenges.controller';
import { ChalengesService } from './chalenges.service';

describe('ChalengesController', () => {
  let chalengesController: ChalengesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChalengesController],
      providers: [ChalengesService],
    }).compile();

    chalengesController = app.get<ChalengesController>(ChalengesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chalengesController.getHello()).toBe('Hello World!');
    });
  });
});

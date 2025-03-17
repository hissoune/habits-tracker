import { Test, TestingModule } from '@nestjs/testing';
import { ChalengesService } from './chalenges.service';
import { ChalengeServiceImplimentation } from './buisness/impl/chalenge-service.impl';
import { ProgressService } from './chalengesProgress/progress.service';
import { ClientProxy } from '@nestjs/microservices';
import { chalengesGateway } from './gateway/chalenges.gateway';
import { Challenge } from './schemas/chalenge.schema';
import { CreateChalengeDto } from './dto/create-chalenge.dto';
import { UpdateChalengeDto } from './dto/update-chalenge.dto';

describe('ChalengesService', () => {
  let service: ChalengesService;
  let chalengeServiceImplimentation: ChalengeServiceImplimentation;
  let progressService: ProgressService;
  let authClient: ClientProxy;
  let chalengeGateway: chalengesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChalengesService,
        {
          provide: ChalengeServiceImplimentation,
          useValue: {
            getAllChalenges: jest.fn(),
            getChalengeByCreator: jest.fn(),
            getChalengeById: jest.fn(),
            joinChalenge: jest.fn(),
            createChalenge: jest.fn(),
            updateChalenge: jest.fn(),
            deleteChalenge: jest.fn(),
            updateChalengesProgressByFrequency: jest.fn(),
          },
        },
        {
          provide: ProgressService,
          useValue: {
            getParticipantProgress: jest.fn(),
            createProgress: jest.fn(),
            updateProgress: jest.fn(),
          },
        },
        {
          provide: 'AUTH_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: chalengesGateway,
          useValue: {
            emitchalengeUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChalengesService>(ChalengesService);
    chalengeServiceImplimentation = module.get<ChalengeServiceImplimentation>(ChalengeServiceImplimentation);
    progressService = module.get<ProgressService>(ProgressService);
    authClient = module.get<ClientProxy>('AUTH_SERVICE');
    chalengeGateway = module.get<chalengesGateway>(chalengesGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllChalenges', () => {
    it('should return all challenges with creator and participants details', async () => {
      const mockChallenges = [{ _id: '1', creator: 'user1', participants: [] }];
     (chalengeServiceImplimentation.getAllChalenges as jest.Mock).mockResolvedValue(mockChallenges);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ _id: 'user1', name: 'John Doe' }),
      } as any);

      const result = await service.getAllChalenges();

      expect(chalengeServiceImplimentation.getAllChalenges).toHaveBeenCalled();
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(result).toEqual([{ _id: '1', creator: { _id: 'user1', name: 'John Doe' }, participants: [] }]);
    });
  });

  describe('getUserChalenges', () => {
    it('should return challenges for a specific user', async () => {
      const mockChallenges = [{ _id: '1', creator: 'user1', participants: [] }];
      (chalengeServiceImplimentation.getChalengeByCreator as jest.Mock).mockResolvedValue(mockChallenges);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ _id: 'user1', name: 'John Doe' } as { _id: string; name: string }),
      } as any);
      const result = await service.getUserChalenges('user1');

      expect(chalengeServiceImplimentation.getChalengeByCreator).toHaveBeenCalledWith('user1');
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(result).toEqual([{ _id: '1', creator: { _id: 'user1', name: 'John Doe' }, participants: [] }]);
    });
  });

  describe('getChalengeById', () => {
    it('should return a challenge by ID', async () => {
      const mockChallenge = { _id: '1', creator: 'user1', participants: [] };
      (chalengeServiceImplimentation.getChalengeById as jest.Mock).mockResolvedValue(mockChallenge);

      const result = await service.getChalengeById('1');

      expect(chalengeServiceImplimentation.getChalengeById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockChallenge);
    });
  });

  describe('joinChalenge', () => {
    it('should allow a user to join a challenge', async () => {
      const mockChallenge = { _id: '1', creator: 'user1', participants: [] };
      (chalengeServiceImplimentation.joinChalenge as jest.Mock).mockResolvedValue(mockChallenge);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ _id: 'user1', name: 'John Doe' }),
      } as any);

      const result = await service.joinChalenge('1', 'user1');

      expect(chalengeServiceImplimentation.joinChalenge).toHaveBeenCalledWith('1', 'user1');
      expect(result).toEqual({ _id: '1', creator: { _id: 'user1', name: 'John Doe' }, participants: [] });
    });
  });

  describe('createChalenge', () => {
    it('should create a new challenge', async () => {
      const mockChallenge = { _id: '1', creator: 'user1', participants: [] };
      const createChalengeDto: CreateChalengeDto = {
          title: 'Test Challenge', creator: 'user1',
          description: '',
          endDate: '',
          startDate: ''
      };
      (chalengeServiceImplimentation.createChalenge as jest.Mock).mockResolvedValue(mockChallenge);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ _id: 'user1', name: 'John Doe' }),
      } as any);

      const result = await service.createChalenge(createChalengeDto);

      expect(chalengeServiceImplimentation.createChalenge).toHaveBeenCalledWith(createChalengeDto);
      expect(result).toEqual({ _id: '1', creator: { _id: 'user1', name: 'John Doe' }, participants: [] });
    });
  });

  describe('updateChalenge', () => {
    it('should update an existing challenge', async () => {
      const mockChallenge = { _id: '1', creator: 'user1', participants: [] };
      const updateChalengeDto: UpdateChalengeDto = { title: 'Updated Challenge' };
      (chalengeServiceImplimentation.updateChalenge as jest.Mock).mockResolvedValue(mockChallenge);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({ _id: 'user1', name: 'John Doe' }),
      } as any);

      const result = await service.updateChalenge('1', updateChalengeDto);

      expect(chalengeServiceImplimentation.updateChalenge).toHaveBeenCalledWith('1', updateChalengeDto);
      expect(result).toEqual({ _id: '1', creator: { _id: 'user1', name: 'John Doe' }, participants: [] });
    });
  });

  describe('deleteChalenge', () => {
    it('should delete a challenge', async () => {
      (chalengeServiceImplimentation.deleteChalenge as jest.Mock).mockResolvedValue(true);

      const result = await service.deleteChalenge('1');

      expect(chalengeServiceImplimentation.deleteChalenge).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });
  });

  describe('updateChalengesProgressByFrequency', () => {
    it('should create challenges progress by frequency', async () => {
      const mockChallenges = [{ _id: '1', title: 'Test Challenge', participants: [{ userId: 'user1', progress: 50 }] }];
      (chalengeServiceImplimentation.updateChalengesProgressByFrequency as jest.Mock).mockResolvedValue(mockChallenges);
      (progressService.getParticipantProgress as jest.Mock).mockResolvedValue(null);
      (progressService.createProgress as jest.Mock).mockResolvedValue(true);
      (progressService.updateProgress as jest.Mock).mockResolvedValue(true);

      await service.updateChalengesProgressByFrequency('daily');

      expect(chalengeServiceImplimentation.updateChalengesProgressByFrequency).toHaveBeenCalledWith('daily');
      expect(progressService.getParticipantProgress).toHaveBeenCalled();
      expect(progressService.createProgress).toHaveBeenCalled();
    });

    it('should update progress when progress exists and is less than 100', async () => {
        const mockChallenges = [
          {
            _id: '1',
            title: 'Test Challenge',
            participants: [{ userId: 'user1', progress: 50 }], 
          },
        ];
        (chalengeServiceImplimentation.updateChalengesProgressByFrequency as jest.Mock).mockResolvedValue(mockChallenges);
        (progressService.getParticipantProgress as jest.Mock).mockResolvedValue({
          userId: 'user1',
          challengeId: '1',
          progress: 50,
        }); 
        (progressService.updateProgress as jest.Mock).mockResolvedValue({ _id: '1',
            title: 'Test Challenge',
            creator: 'user1',
            participants: [{ userId: 'user1', progress: 50 }], });
        jest.spyOn(authClient, 'send').mockReturnValue({
          toPromise: jest.fn().mockResolvedValue([{ _id: 'user1', name: 'John Doe' }]),
        } as any);
  
        await service.updateChalengesProgressByFrequency('daily');
  
        expect(chalengeServiceImplimentation.updateChalengesProgressByFrequency).toHaveBeenCalledWith('daily');
        expect(progressService.getParticipantProgress).toHaveBeenCalledWith('1', 'user1');
        expect(progressService.updateProgress).toHaveBeenCalledWith('user1', '1');
        expect(chalengeGateway.emitchalengeUpdate).toHaveBeenCalled();
      });
  });
});
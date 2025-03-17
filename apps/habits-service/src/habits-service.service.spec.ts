import { Test, TestingModule } from '@nestjs/testing';
import { HabitsServiceService } from './habits-service.service';
import { HabitsServiceImpl } from './business/impl/habits-service-impl';
import { HabitProgressService } from './habitsProgress/habitProgress.service';
import { ClientProxy } from '@nestjs/microservices';

describe('HabitsServiceService', () => {
  let service: HabitsServiceService;
  let habitsImplimentations: HabitsServiceImpl;
  let habitProgressService: HabitProgressService;
  let authClient: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsServiceService,
        {
          provide: HabitsServiceImpl,
          useValue: {
            createHabit: jest.fn(),
            getAllHabitsForAdmin: jest.fn(),
            getAllHabits: jest.fn(),
            getHabitById: jest.fn(),
            reactiveHabit: jest.fn(),
            getHabitsByFrequency: jest.fn(),
            deleteHabit: jest.fn(),
          },
        },
        {
          provide: HabitProgressService,
          useValue: {
            getProgress: jest.fn(),
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
      ],
    }).compile();

    service = module.get<HabitsServiceService>(HabitsServiceService);
    habitsImplimentations = module.get<HabitsServiceImpl>(HabitsServiceImpl);
    habitProgressService = module.get<HabitProgressService>(HabitProgressService);
    authClient = module.get<ClientProxy>('AUTH_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHabit', () => {
    it('should create a habit and return it with the creator', async () => {
      const mockHabit = { _id: '1', userId: 'user1', title: 'Test Habit' };
      const mockCreator = { _id: 'user1', name: 'John Doe' };

      (habitsImplimentations.createHabit as jest.Mock).mockResolvedValue(mockHabit);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue(mockCreator),
      } as any);

      const result = await service.createHabit(mockHabit);

      expect(habitsImplimentations.createHabit).toHaveBeenCalledWith(mockHabit);
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(result).toEqual({ ...mockHabit, userId: mockCreator });
    });
  });

  describe('getAllHabitsForAdmin', () => {
    it('should return all habits with creators', async () => {
      const mockHabits = [
        { _id: '1', userId: 'user1', title: 'Test Habit 1' },
        { _id: '2', userId: 'user2', title: 'Test Habit 2' },
      ];
      const mockCreator1 = { _id: 'user1', name: 'John Doe' };
      const mockCreator2 = { _id: 'user2', name: 'Jane Doe' };

      (habitsImplimentations.getAllHabitsForAdmin as jest.Mock).mockResolvedValue(mockHabits);
      jest.spyOn(authClient, 'send').mockImplementation((pattern, data) => {
        if (data === 'user1') {
          return {
            toPromise: jest.fn().mockResolvedValue(mockCreator1),
          } as any;
        } else if (data === 'user2') {
          return {
            toPromise: jest.fn().mockResolvedValue(mockCreator2),
          } as any;
        }
        return {
          toPromise: jest.fn().mockResolvedValue(null),
        } as any;
      });

      const result = await service.getAllHabitsForAdmin();

      expect(habitsImplimentations.getAllHabitsForAdmin).toHaveBeenCalled();
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user2');
      expect(result).toEqual([
        { ...mockHabits[0], userId: mockCreator1 },
        { ...mockHabits[1], userId: mockCreator2 },
      ]);
    });
  });

  describe('reactiveHabit', () => {
    it('should reactive a habit and return it with the creator', async () => {
      const habitId = '1';
      const mockHabit = { _id: '1', userId: 'user1', title: 'Test Habit' };
      const mockCreator = { _id: 'user1', name: 'John Doe' };

      (habitsImplimentations.reactiveHabit as jest.Mock).mockResolvedValue(mockHabit);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue(mockCreator),
      } as any);

      const result = await service.reactiveHabit(habitId);

      expect(habitsImplimentations.reactiveHabit).toHaveBeenCalledWith(habitId);
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(result).toEqual({ ...mockHabit, userId: mockCreator });
    });
  });
  describe('getHabits', () => {
    it('should return habits for a specific user', async () => {
      const userId = 'user1';
      const mockHabits = [
        { _id: '1', userId: 'user1', title: 'Test Habit 1' },
        { _id: '2', userId: 'user1', title: 'Test Habit 2' },
      ];

      (habitsImplimentations.getAllHabits as jest.Mock).mockResolvedValue(mockHabits);

      const result = await service.getHabits(userId);

      expect(habitsImplimentations.getAllHabits).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockHabits);
    });
  });

  describe('getHabitById', () => {
    it('should return a habit by ID', async () => {
      const habitId = '1';
      const mockHabit = { _id: '1', userId: 'user1', title: 'Test Habit' };

      (habitsImplimentations.getHabitById as jest.Mock).mockResolvedValue(mockHabit);

      const result = await service.getHabitById(habitId);

      expect(habitsImplimentations.getHabitById).toHaveBeenCalledWith(habitId);
      expect(result).toEqual(mockHabit);
    });
  });

  describe('reactiveHabit', () => {
    it('should reactive a habit and return it with the creator', async () => {
      const habitId = '1';
      const mockHabit = { _id: '1', userId: 'user1', title: 'Test Habit' };
      const mockCreator = { _id: 'user1', name: 'John Doe' };

      (habitsImplimentations.reactiveHabit as jest.Mock).mockResolvedValue(mockHabit);
      jest.spyOn(authClient, 'send').mockReturnValue({
        toPromise: jest.fn().mockResolvedValue(mockCreator),
      } as any);

      const result = await service.reactiveHabit(habitId);

      expect(habitsImplimentations.reactiveHabit).toHaveBeenCalledWith(habitId);
      expect(authClient.send).toHaveBeenCalledWith('get-creator', 'user1');
      expect(result).toEqual({ ...mockHabit, userId: mockCreator });
    });
  });

  describe('updateProgressByFrequency', () => {
    it('should update progress for habits with the given frequency', async () => {
      const frequency = 'daily';
      const mockHabits = [
        { _id: '1', userId: 'user1', title: 'Test Habit 1', status: 'active' },
        { _id: '2', userId: 'user2', title: 'Test Habit 2', status: 'active' },
      ];

      (habitsImplimentations.getHabitsByFrequency as jest.Mock).mockResolvedValue(mockHabits);
      (habitProgressService.getProgress as jest.Mock).mockResolvedValue(null);
      (habitProgressService.createProgress as jest.Mock).mockResolvedValue(true);

      await service.updateProgressByFrequency(frequency);

      expect(habitsImplimentations.getHabitsByFrequency).toHaveBeenCalledWith(frequency);
      expect(habitProgressService.getProgress).toHaveBeenCalled();
      expect(habitProgressService.createProgress).toHaveBeenCalled();
    });
  });

  describe('deleteHabit', () => {
    it('should delete a habit by ID', async () => {
      const habitId = '1';

      (habitsImplimentations.deleteHabit as jest.Mock).mockResolvedValue(true);

      const result = await service.deletHabit(habitId);

      expect(habitsImplimentations.deleteHabit).toHaveBeenCalledWith(habitId);
      expect(result).toBe(true);
    });
  });
});
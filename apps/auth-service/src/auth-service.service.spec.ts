import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceService } from './auth-service.service';
import { AuthImplementation } from './implementations/auth.implementation';
import { User } from './schemas/user.schema';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let authImplementation: AuthImplementation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceService,
        {
          provide: AuthImplementation,
          useValue: {
            register: jest.fn(),
            getUsersByIds: jest.fn(),
            getUserById: jest.fn(),
            banOrUnban: jest.fn(),
            login: jest.fn(),
            getUsers: jest.fn(),
            verifyToken: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthServiceService>(AuthServiceService);
    authImplementation = module.get<AuthImplementation>(AuthImplementation);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('getUsersByIds', () => {
    it('should call authImplementation.getUsersByIds with the provided ids', async () => {
      const ids = ['id1', 'id2'];

      await service.getUsersByIds(ids);

      expect(authImplementation.getUsersByIds).toHaveBeenCalledWith(ids);
    });
  });

  describe('getUserById', () => {
    it('should call authImplementation.getUserById with the provided userId', async () => {
      const userId = 'someUserId';

      await service.getUserById(userId);

      expect(authImplementation.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('banOrUnban', () => {
    it('should call authImplementation.banOrUnban with the provided id', async () => {
      const id = 'someId';

      await service.banOrUnban(id);

      expect(authImplementation.banOrUnban).toHaveBeenCalledWith(id);
    });
  });

  describe('login', () => {
    it('should call authImplementation.login with the provided data', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' };

      await service.login(loginData);

      expect(authImplementation.login).toHaveBeenCalledWith(loginData);
    });
  });

  describe('getAllUsers', () => {
    it('should call authImplementation.getUsers with the provided id', async () => {
      const id = 'someId';

      await service.getAllUsers(id);

      expect(authImplementation.getUsers).toHaveBeenCalledWith(id);
    });
  });

  describe('verifyToken', () => {
    it('should call authImplementation.verifyToken with the provided token', async () => {
      const token = 'someToken';

      await service.verifyToken(token);

      expect(authImplementation.verifyToken).toHaveBeenCalledWith(token);
    });
  });

  describe('forgotPassword', () => {
    it('should call authImplementation.forgotPassword with the provided email', async () => {
      const email = 'test@example.com';

      await service.forgotPassword(email);

      expect(authImplementation.forgotPassword).toHaveBeenCalledWith(email);
    });
  });

  describe('resetPassword', () => {
    it('should call authImplementation.resetPassword with the provided resetToken and newPassword', async () => {
      const resetData = { resetToken: 'someToken', newPassword: 'newPassword123' };

      await service.resetPassword(resetData);

      expect(authImplementation.resetPassword).toHaveBeenCalledWith(resetData.resetToken, resetData.newPassword);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.register', async () => {
    const dto = {
      username: 'test',
      email: 'test@test.com',
      password: '12345678',
    };
    mockAuthService.register.mockResolvedValue({ id: '1', email: dto.email });

    await controller.register(dto);

    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
  });

  it('should call authService.login', async () => {
    const dto = { email: 'test@test.com', password: '12345678' };
    mockAuthService.login.mockResolvedValue({
      accessToken: 'token',
      refreshToken: 'refresh',
    });

    await controller.login(dto);

    expect(mockAuthService.login).toHaveBeenCalledWith(dto);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mock_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and not return password', async () => {
      const dto = {
        username: 'testuser',
        email: 'test@test.com',
        password: '12345678',
      };
      const mockUser = {
        id: '1',
        ...dto,
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(mockUser);

      const result = await service.register(dto);

      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe(dto.email);
    });
  });

  describe('login', () => {
    it('should return tokens on valid credentials', async () => {
      const dto = { email: 'test@test.com', password: '12345678' };
      const mockUser = {
        id: '1',
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login(dto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@test.com', password: '12345678' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        password: await bcrypt.hash('correct_password', 10),
      };
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.login({ email: 'test@test.com', password: 'wrong_password' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

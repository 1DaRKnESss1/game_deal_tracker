import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('WishlistService', () => {
  let service: WishlistService;

  const mockPrismaService = {
    wishList: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all wishlist items for a user', async () => {
    const mockItems = [
      {
        id: '1',
        userId: 'user1',
        gameId: '123',
        title: 'Cyberpunk 2077',
        price: 29.99,
        thumb: 'http://img.com',
      },
    ];

    mockPrismaService.wishList.findMany.mockResolvedValue(mockItems);

    const result = await service.getAll('user1');

    expect(result).toEqual(mockItems);
    expect(mockPrismaService.wishList.findMany).toHaveBeenCalledWith({
      where: { userId: 'user1' },
    });
  });

  it('should add a game to wishlist', async () => {
    const dto = {
      gameId: '123',
      title: 'Cyberpunk 2077',
      price: 29.99,
      thumb: 'http://img.com',
    };
    const mockItem = { id: '1', userId: 'user1', ...dto };

    mockPrismaService.wishList.create.mockResolvedValue(mockItem);

    const result = await service.addGame('user1', dto);

    expect(result).toEqual(mockItem);
  });
});

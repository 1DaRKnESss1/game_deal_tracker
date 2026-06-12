import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

describe('WishlistController', () => {
  let controller: WishlistController;

  const mockWishlistService = {
    addGame: jest.fn(),
    getAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [
        {
          provide: WishlistService,
          useValue: mockWishlistService,
        },
      ],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call wishlistService.getAll with userId', async () => {
    const req = { user: { id: 'user1' } };
    mockWishlistService.getAll.mockResolvedValue([]);

    await controller.getAll(req);

    expect(mockWishlistService.getAll).toHaveBeenCalledWith('user1');
  });

  it('should call wishlistService.remove with id', async () => {
    mockWishlistService.remove.mockResolvedValue({ id: '1' });

    await controller.delete('1');

    expect(mockWishlistService.remove).toHaveBeenCalledWith('1');
  });
});

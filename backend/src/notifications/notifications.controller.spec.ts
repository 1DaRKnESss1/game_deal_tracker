import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  const mockNotificationsService = {
    getAll: jest.fn(),
    markAsRead: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationsService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAll with userId', async () => {
    const req = { user: { id: 'user1' } };
    mockNotificationsService.getAll.mockResolvedValue([]);

    await controller.getAll(req);

    expect(mockNotificationsService.getAll).toHaveBeenCalledWith('user1');
  });

  it('should call markAsRead with id', async () => {
    mockNotificationsService.markAsRead.mockResolvedValue({
      id: '1',
      isRead: true,
    });

    const result: unknown = await controller.markAsRead('1');

    expect(mockNotificationsService.markAsRead).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1', isRead: true });
  });

  it('should call delete with id', async () => {
    mockNotificationsService.delete.mockResolvedValue({ id: '1' });

    const result: unknown = await controller.delete('1');

    expect(mockNotificationsService.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });
});

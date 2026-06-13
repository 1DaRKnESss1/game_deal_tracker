import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockPrismaService = {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a notification', async () => {
    const mockNotification = {
      id: '1',
      userId: 'user1',
      message: 'Price drop!',
      isRead: false,
    };
    mockPrismaService.notification.create.mockResolvedValue(mockNotification);

    const result: unknown = await service.create('user1', 'Price drop!');

    expect(mockPrismaService.notification.create).toHaveBeenCalledWith({
      data: { userId: 'user1', message: 'Price drop!' },
    });
    expect(result).toEqual(mockNotification);
  });

  it('should get all notifications for a user', async () => {
    const mockNotifications = [
      { id: '1', userId: 'user1', message: 'Price drop!', isRead: false },
    ];
    mockPrismaService.notification.findMany.mockResolvedValue(
      mockNotifications,
    );

    const result: unknown = await service.getAll('user1');

    expect(mockPrismaService.notification.findMany).toHaveBeenCalledWith({
      where: { userId: 'user1' },
    });
    expect(result).toEqual(mockNotifications);
  });

  it('should mark notification as read', async () => {
    const mockNotification = { id: '1', isRead: true };
    mockPrismaService.notification.update.mockResolvedValue(mockNotification);

    const result: unknown = await service.markAsRead('1');

    expect(mockPrismaService.notification.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { isRead: true },
    });
    expect(result).toEqual(mockNotification);
  });

  it('should delete a notification', async () => {
    mockPrismaService.notification.delete.mockResolvedValue({ id: '1' });

    const result: unknown = await service.delete('1');

    expect(mockPrismaService.notification.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual({ id: '1' });
  });
});

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id: string, message: string) {
    return await this.prisma.notification.create({
      data: {
        userId: id,
        message: message,
      },
    });
  }
  async getAll(id: string) {
    return await this.prisma.notification.findMany({
      where: { userId: id },
    });
  }

  async markAsRead(id: string) {
    return await this.prisma.notification.update({
      where: { id: id },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return await this.prisma.notification.delete({
      where: { id },
    });
  }
}

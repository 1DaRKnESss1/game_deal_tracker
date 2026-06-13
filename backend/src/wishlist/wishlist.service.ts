import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addToWishlistDto } from './dto/add-to-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.wishList.findMany({
      where: { userId },
    });
  }

  async addGame(userId: string, dto: addToWishlistDto) {
    const existing = await this.prisma.wishList.findFirst({
      where: {
        userId: userId,
        gameId: dto.gameId,
      },
    });
    if (existing) {
      throw new ConflictException('This game already on your wishlist');
    }

    return this.prisma.wishList.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.wishList.delete({
      where: { id },
    });
  }
}

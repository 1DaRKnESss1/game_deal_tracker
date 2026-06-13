import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';

interface GameApiResponse {
  deals: {
    price: string;
  }[];
}

@Injectable()
export class PriceTrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly notifications: NotificationsService,
  ) {}

  @Cron('0 0 * * *')
  async checkPrices() {
    const wishlistItems = await this.prisma.wishList.findMany();
    for (const item of wishlistItems) {
      const { data } = await firstValueFrom(
        this.httpService.get<GameApiResponse>(
          `https://www.cheapshark.com/api/1.0/games?id=${item.gameId}`,
        ),
      );
      const currentPrice = parseFloat(data.deals[0].price);
      if (currentPrice < item.price) {
        await this.notifications.create(
          item.userId,
          `Price drop for ${item.title}! Now $${currentPrice}`,
        );
        await this.prisma.wishList.update({
          where: { id: item.id },
          data: { price: currentPrice },
        });
      }
    }
  }
}

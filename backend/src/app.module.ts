import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PriceTrackingModule } from './price-tracking/price-tracking.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    GamesModule,
    ConfigModule.forRoot(),
    WishlistModule,
    NotificationsModule,
    PriceTrackingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

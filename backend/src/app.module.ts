import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [AuthModule, PrismaModule, GamesModule, WishlistModule, ConfigModule.forRoot(), WishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

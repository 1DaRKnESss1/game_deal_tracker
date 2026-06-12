import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [HttpModule]
})
export class GamesModule {}

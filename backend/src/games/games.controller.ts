import { Controller, Get, Query } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}


    @Get('search')
    async search(@Query('title') title: string) {
        return await this.gamesService.searchGames(title)
    }

}

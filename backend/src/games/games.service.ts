import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GamesService {
    constructor(private readonly httpService: HttpService) {}

    async searchGames(title: string){

        const encoded = encodeURIComponent(title)

        const { data } = await firstValueFrom(
            this.httpService.get(`https://www.cheapshark.com/api/1.0/games?title=${encoded}`)
        )
        return data
    }
}

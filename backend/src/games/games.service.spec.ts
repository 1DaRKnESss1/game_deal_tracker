import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('GamesService', () => {
  let service: GamesService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search games by title', async () => {
    const mockGames = [
      {
        gameID: '1',
        external: 'Cyberpunk 2077',
        cheapest: '29.99',
        thumb: 'http://img.com',
      },
    ];

    mockHttpService.get.mockReturnValue(of({ data: mockGames }));

    const result: unknown = await service.searchGames('cyberpunk');

    expect(result).toEqual(mockGames);
    expect(mockHttpService.get).toHaveBeenCalledWith(
      expect.stringContaining('cyberpunk'),
    );
  });
});

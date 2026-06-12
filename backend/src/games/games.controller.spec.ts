import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let controller: GamesController;

  const mockGamesService = {
    searchGames: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call gamesService.searchGames with title', async () => {
    const mockGames = [{ gameID: '1', external: 'Cyberpunk 2077' }];
    mockGamesService.searchGames.mockResolvedValue(mockGames);

    const result: unknown = await controller.search('cyberpunk');

    expect(mockGamesService.searchGames).toHaveBeenCalledWith('cyberpunk');
    expect(result).toEqual(mockGames);
  });
});

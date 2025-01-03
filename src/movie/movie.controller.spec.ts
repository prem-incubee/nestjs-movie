import { MovieController } from './movie.controller';
import { vi } from 'vitest';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('given a movie name, it should give oldness', () => {
    // given
    const movieName = 'fakeMovie';
    movieService.getOldness = vi.fn().mockImplementationOnce(() => 'old');

    // when
    const response = controller.getOldness(movieName);

    // then
    expect(response).toBeDefined();
    expect(movieService.getOldness).toHaveBeenCalledWith('fakeMovie');
    expect(response).toEqual('old');
  });
});

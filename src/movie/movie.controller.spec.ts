import { MovieController } from './movie.controller';
import { vi } from 'vitest';
import { MovieService } from './movie.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {  
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: MovieService, useValue: {} }],
      controllers: [MovieController],  })
    .compile();
    controller = module.get<MovieController>(MovieController);
    movieService = module.get(MovieService);
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

  it('given a movie name, it should give rating', () => {
   // given
   const movieName = 'fakeMovie';
   movieService.getRating = vi.fn().mockImplementationOnce(() => 4);

   // when
   const response = controller.getRating(movieName);

   // then
   expect(response).toBeDefined();
   expect(movieService.getRating).toHaveBeenCalledWith('fakeMovie');
   expect(response).toEqual(4);
  });
});

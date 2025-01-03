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

  it('given a movie name, return if movie is profitable', () => {
    // given
    const movieName = 'fakeMovie';
    movieService.getProfitability = vi.fn().mockImplementationOnce(() => true);

    // when
    const response = controller.getProfitablity(movieName);

    //then
    expect(response).toBeDefined();
    expect(movieService.getProfitability).toHaveBeenCalledWith('fakeMovie');
    expect(response).toEqual(true);
  });
});

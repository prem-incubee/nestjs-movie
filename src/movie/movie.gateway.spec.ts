import { Test, TestingModule } from '@nestjs/testing';

import { vi } from 'vitest';
import { MovieGateway } from './movie.gateway';
import { HttpService } from '@nestjs/axios';

describe('MovieGateway', () => {
  let gateway: MovieGateway;
  let httpApi: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieGateway,
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    gateway = module.get(MovieGateway);
    httpApi = module.get(HttpService);
  });

  it('given a movie name, it should call the http api', () => {
    // given
    const movieName = 'fake';
    httpApi.get = vi.fn().mockImplementationOnce(() => {});

    // when
    const response = gateway.getMovie(movieName);

    // then
    expect(httpApi.get).toHaveBeenCalledWith(
      'http://localhost:3001/movies/fake',
    );
  });
});

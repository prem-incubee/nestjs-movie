import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

import { vi } from 'vitest';
import { MovieGateway } from './movie.gateway';

describe('MovieService', () => {
  let service: MovieService;
  let gateway: MovieGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: MovieGateway,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    gateway = module.get(MovieGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('given a movie name, it should call the movie gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        meta: {
          releasedOn: '2018-10-12T10:15:46.752Z'
        }
      }
    }));

    // when
    const response = await service.getOldness(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
  });
  it('should identify new movie', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        meta: {
          releasedOn: '2018-10-12T10:15:46.752Z'
        }
      }
    }));

    // when
    const response = await service.getOldness(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.oldness).toEqual('new');
  });
  it('should identify old movie', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        meta: {
          releasedOn: '1989-10-12T10:15:46.752Z'
        }
      }
    }));

    // when
    const response = await service.getOldness(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.oldness).toEqual('old');
  });
  it('should identify 90s movie', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        meta: {
          releasedOn: '1999-10-12T10:15:46.752Z'
        }
      }
    }));

    // when
    const response = await service.getOldness(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.oldness).toEqual('90s');
  });

  it('should call the gateway to get movie', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        money: { made: 10, budget: 11 },
      }
    }));

    // when
    await service.getProfitability(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
  });

  it('should return PROFITABLE when budget is less than made', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        money: { made: 10, budget: 9 },
      }
    }));

    // when
    const response = await service.getProfitability(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.profitable).toEqual("PROFITABLE");
  });

  it('should return NONPROFITABLE when budget is more than made', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        money: { made: 10, budget: 11 },
      }
    }));

    // when
    const response = await service.getProfitability(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.profitable).toEqual("NONPROFITABLE");
  });

  it('should return BLOCKBUSTER difference between between made and budget is greater than 100', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        money: { made: 200, budget: 11 },
      }
    }));

    // when
    const response = await service.getProfitability(movieName);

    // then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.profitable).toEqual("BLOCKBUSTER");
  });
});

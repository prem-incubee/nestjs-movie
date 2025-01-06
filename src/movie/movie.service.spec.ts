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

  it('should call gateway to get the movie', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 8
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
  })  

  it('should return 4 for 8 rating from gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 8
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.rating).toBe(4);
  }) 

  it('should return 4.5 for 9 rating from gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 9
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.rating).toBe(4.5);
  })

  it('should return 4 for 7.6 rating from gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 7.6
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.rating).toBe(4);
  })  

  it('should return 3 for 5.5 rating from gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 5.5
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.rating).toBe(3);
  })

  it('should return 3.5 for 7.1 rating from gateway', async () => {
    // given
    const movieName = 'fake';
    gateway.getMovie = vi.fn().mockImplementationOnce(() => Promise.resolve({
      data: {
        rating: 7.1
      }
    }));

    // when
    const response = await service.getRating(movieName);

    //then
    expect(gateway.getMovie).toHaveBeenCalledWith('fake');
    expect(response.rating).toBe(3.5);
  })  
});

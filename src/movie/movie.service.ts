import { Injectable } from '@nestjs/common';
import { MovieGateway } from './movie.gateway';
import { parseISO } from 'date-fns';

@Injectable()
export class MovieService {
  constructor(private gateway: MovieGateway) {}

  async getOldness(movieName: string) {
    let movie = await this.gateway.getMovie(movieName);
    const date = this.parse(movie);
    if (date.getFullYear() < 1990) {
      return { oldness: 'old' };
    } else if (date.getFullYear() < 2000) {
      return { oldness: '90s' };
    }
    return { oldness: 'new' };
  }

  async getRating(movieName: string) {
    let movie = await this.gateway.getMovie(movieName);
    return { rating: 4 };
  }

  private parse(movie) {
    const date = parseISO(movie.data.meta.releasedOn);
    return date;
  }
}

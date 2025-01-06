import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/:movieName/oldness')
  getOldness(@Param('movieName') movieName: string) {
    return this.movieService.getOldness(movieName);
  }

  @Get('/:movieName/rating')
  getRating(@Param('movieName') movieName: string) {
    return this.movieService.getRating(movieName);
  }
}

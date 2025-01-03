import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MovieGateway {
  constructor(private httpService: HttpService) {}

  async getMovie(movieName: string) {
    const url = `http://localhost:3001/movies/${movieName}`;
    const observable = this.httpService.get(url).pipe(map((res) => res.data));
    return lastValueFrom(observable);
  }
}

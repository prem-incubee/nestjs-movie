import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/dune')
  getDune(): Observable<unknown> {
    return this.httpService
      .get('http://localhost:3001/movies/dune')
      .pipe(map((res) => res.data));
  }

  @Get('/one')
  getOne(): Observable<unknown> {
    return this.httpService
      .get('http://localhost:3002/one')
      .pipe(map((res) => ({ data: res.data.value })));
  }
}

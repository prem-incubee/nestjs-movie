import { Injectable } from '@nestjs/common';

@Injectable()
export class SumService {
  sum(number: number, number2: number) {
    return number + number2;
  }
}

import { Injectable } from '@nestjs/common';
import { SumService } from './sum.service';

@Injectable()
export class CalculatorService {
  constructor(private sumService: SumService) {}

  sum(number: number, number2: number) {
    return number + number2;
  }

  aweSum(number: number, number2: number) {
    return this.sumService.sum(number, number2);
  }
}

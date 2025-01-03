import { CalculatorService } from './calculator.service';
import { SumService } from './sum.service';
import { vi } from 'vitest';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let sum: SumService;

  beforeEach(async () => {
    sum = new SumService();
    service = new CalculatorService(sum);
  });

  it('should do sum', () => {
    expect(service.sum(1, 2)).toBe(3);
  });

  it('should do awe-sum', () => {
    sum.sum = vi.fn().mockImplementationOnce(() => 4);
    expect(service.aweSum(1, 2)).toBe(4);
  });
});

import { SumService } from './sum.service';

describe('SumService', () => {
  let service: SumService;

  beforeEach(async () => {
    service = new SumService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should do sum', () => {
    expect(service.sum(1, 2)).toBe(3);
  });
});

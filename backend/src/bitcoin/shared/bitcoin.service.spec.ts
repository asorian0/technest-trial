import { Test, TestingModule } from '@nestjs/testing';
import { BitcoinService } from './bitcoin.service';

describe('BitcoinService', () => {
  let service: BitcoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitcoinService],
    }).compile();

    service = module.get<BitcoinService>(BitcoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return observable with random numeric value', async () => {
    const result = await service.getCurrentBitcoinValue().toPromise();

    expect(result).not.toBeUndefined();
    expect(isNaN(result)).toBeFalsy();
  });
});

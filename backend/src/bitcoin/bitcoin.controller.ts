import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Response } from '../shared/response.model';

import { BitcoinService } from './shared/bitcoin.service';
import { Currency } from './shared/currency.enum';

@Controller('bitcoin')
export class BitcoinController {
  constructor(private readonly service: BitcoinService) {
  }

  @Get()
  public getCurrentValue(@Param('currency') currency?: Currency): Observable<Response<number>> {
    return this.service.getCurrentBitcoinValue(currency).pipe(map(data => ({ data })));
  }
}

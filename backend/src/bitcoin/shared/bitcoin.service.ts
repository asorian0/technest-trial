import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import fetch from 'node-fetch';

import * as config from '../../../config.json';

import { Currency } from './currency.enum';

@Injectable()
export class BitcoinService {
  public getCurrentBitcoinValue(
    currency: Currency = Currency.USD,
  ): Observable<number> {
    return from(
      fetch(`${config.bitcoin.API}/ticker`)
        .then((r) => r.json())
        .then((r) => r[currency].last),
    );
  }
}

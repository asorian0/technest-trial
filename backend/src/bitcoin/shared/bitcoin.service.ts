import { Injectable } from '@nestjs/common';
import { finance } from 'faker';
import { Observable, of } from 'rxjs';
import { Currency } from 'technest-trial-shared/enum/currency.enum';

@Injectable()
export class BitcoinService {
  private readonly min = 5000;
  private readonly max = 12000;

  public getCurrentBitcoinValue(
    _currency: Currency = Currency.USD,
  ): Observable<number> {
    return of(Number(finance.amount(this.min, this.max)));
  }
}

import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBitcoin',
})
export class CurrencyBitcoinPipe implements PipeTransform {
  transform(
    value: number,
    toUSD: boolean = false,
    bitcoinValue?: number,
  ): string {
    if (toUSD) {
      return formatCurrency(value * bitcoinValue, 'en', '$');
    }
    return `${Number(value).toFixed(8)} BTC`;
  }
}

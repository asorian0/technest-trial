import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBitcoin'
})
export class CurrencyBitcoinPipe implements PipeTransform {
  transform(value: number, bitcoinValue: number): string {
    return `${(value / bitcoinValue).toFixed(8)} BTC`;
  }
}

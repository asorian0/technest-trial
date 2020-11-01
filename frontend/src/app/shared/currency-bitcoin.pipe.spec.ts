import { CurrencyBitcoinPipe } from './currency-bitcoin.pipe';

describe('CurrencyBitcoinPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyBitcoinPipe();
    expect(pipe).toBeTruthy();
  });
});

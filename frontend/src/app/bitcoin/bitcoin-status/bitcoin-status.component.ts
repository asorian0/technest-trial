import { Component, OnInit } from '@angular/core';

import { BitcoinService } from '../shared/bitcoin.service';

@Component({
  selector: 'app-bitcoin-status',
  templateUrl: './bitcoin-status.component.html',
  styleUrls: ['./bitcoin-status.component.scss'],
})
export class BitcoinStatusComponent implements OnInit {
  public currentValue: number;

  constructor(private readonly service: BitcoinService) {}

  public ngOnInit(): void {
    this.service.currentValue$.subscribe(
      (currentValue) => (this.currentValue = currentValue),
    );
  }
}

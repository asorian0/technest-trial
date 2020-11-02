import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

import { BitcoinStatusComponent } from './bitcoin-status/bitcoin-status.component';

@NgModule({
  declarations: [BitcoinStatusComponent],
  imports: [CommonModule, MaterialModule],
  exports: [BitcoinStatusComponent],
})
export class BitcoinModule {}

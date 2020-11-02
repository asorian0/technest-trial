import { Component, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AccountTransaction } from 'technest-trial-shared/model/account-transaction.model';
import { Account } from 'technest-trial-shared/model/account.model';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';

/**
 * This class just holds repetitive code between account components, so template is actually fake
 */
@Component({
  template: '',
})
export abstract class AccountViewAbstractComponent implements OnDestroy {
  protected readonly destroy$ = new Subject();

  @HostBinding('class')
  public hostClass =
    'position-absolute w-100 h-100 overflow-auto d-flex flex-column p-3';

  @ViewChild(MatSort)
  public sort: MatSort;
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public currentBitconRate$ = this.bitcoinService.currentValue$;

  protected constructor(protected readonly bitcoinService: BitcoinService) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected setTableFeatures(
    source: MatTableDataSource<Account | AccountTransaction>,
  ): void {
    source.sort = this.sort;
    source.paginator = this.paginator;
  }
}

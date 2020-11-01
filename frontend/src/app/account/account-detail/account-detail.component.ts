import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountStatus } from 'technest-trial-shared/enum/account-status.enum';
import { AccountTransaction } from 'technest-trial-shared/model/account-transaction.model';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';
import { CssClassCleanerService } from '../../shared/css-class-cleaner.service';
import { AccountQuery } from '../shared/account.query';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements AfterViewInit {
  private readonly destroy$ = new Subject();

  @HostBinding('class')
  public hostClass =
    'position-absolute w-100 h-100 overflow-auto d-flex flex-column p-3';

  @ViewChild(MatSort)
  public sort: MatSort;
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public current$ = this.accountQuery.current$;
  public currentBitconRate$ = this.bitcoinService.currentValue$;

  public currentId: string;
  public data: MatTableDataSource<AccountTransaction> = new MatTableDataSource(
    [],
  );
  public columnsToDisplay: string[] = [
    'confirmedDate',
    'orderId',
    'orderCode',
    'transactionType',
    'debit',
    'credit',
    'balance',
  ];
  public pageSizeOptions: number[] = [5, 10, 25];
  public status: AccountStatus;

  constructor(
    private readonly accountQuery: AccountQuery,
    private readonly bitcoinService: BitcoinService,
    private readonly query: AccountQuery,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cleaner: CssClassCleanerService,
  ) {}

  public ngAfterViewInit(): void {
    this.current$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.currentId = data._id;
      this.data = new MatTableDataSource(data.transactions || []);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });

    this.query.active$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data._id === this.currentId) {
        this.status = data.status;
        this.changeDetectorRef.detectChanges();
        this.cleaner.cleanElementWithClass(this.status);
      }
    });
  }
}

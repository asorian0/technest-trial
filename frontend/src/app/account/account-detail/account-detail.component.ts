import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { AccountStatus } from 'technest-trial-shared/enum/account-status.enum';
import { AccountTransaction } from 'technest-trial-shared/model/account-transaction.model';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';
import { CssClassCleanerService } from '../../shared/css-class-cleaner.service';
import { AccountView } from '../shared/account-view-abstract.component';
import { AccountQuery } from '../shared/account.query';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent
  extends AccountView
  implements AfterViewInit {
  public current$ = this.accountQuery.current$;

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
    private readonly query: AccountQuery,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cleaner: CssClassCleanerService,
    bitcoinService: BitcoinService,
  ) {
    super(bitcoinService);
  }

  public ngAfterViewInit(): void {
    this.current$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.currentId = data._id;
      this.data = new MatTableDataSource(data.transactions || []);
      this.setTableFeatures(this.data);
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

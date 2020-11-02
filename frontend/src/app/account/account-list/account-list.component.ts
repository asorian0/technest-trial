import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'technest-trial-shared/model/account.model';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';
import { CssClassCleanerService } from '../../shared/css-class-cleaner.service';
import { AccountView } from '../shared/account-view-abstract.component';
import { AccountQuery } from '../shared/account.query';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent
  extends AccountView
  implements AfterViewInit, OnInit {
  public data: MatTableDataSource<Account> = new MatTableDataSource([]);
  public columnsToDisplay: string[] = [
    'accountName',
    'category',
    'tags',
    'balance',
    'availableBalance',
  ];
  public pageSizeOptions: number[] = [25, 50, 100];

  constructor(
    private readonly query: AccountQuery,
    private readonly cleaner: CssClassCleanerService,
    bitcoinService: BitcoinService,
  ) {
    super(bitcoinService);
  }

  public ngOnInit(): void {
    this.query.active$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.cleaner.cleanElementWithClass(data.status));
  }

  public ngAfterViewInit(): void {
    this.query.all$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = new MatTableDataSource(data);
      this.setTableFeatures(this.data);
    });
  }
}

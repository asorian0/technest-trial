import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'technest-trial-shared/model/account.model';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';
import { CssClassCleanerService } from '../../shared/css-class-cleaner.service';

import { AccountQuery } from '../shared/account.query';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  @HostBinding('class')
  public hostClass =
    'position-absolute w-100 h-100 overflow-auto d-flex flex-column p-3';

  @ViewChild(MatSort)
  public sort: MatSort;
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public data: MatTableDataSource<Account> = new MatTableDataSource([]);
  public columnsToDisplay: string[] = [
    'accountName',
    'category',
    'tags',
    'balance',
    'availableBalance',
  ];
  public pageSizeOptions: number[] = [25, 50, 100];
  public currentBitconRate$ = this.bitcoinService.currentValue$;

  constructor(
    private readonly service: AccountService,
    private readonly bitcoinService: BitcoinService,
    private readonly query: AccountQuery,
    private readonly cleaner: CssClassCleanerService,
  ) {}

  public ngOnInit(): void {
    this.query.active$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.cleaner.cleanElementWithClass(data.status));
  }

  public ngAfterViewInit(): void {
    this.query.all$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.data = new MatTableDataSource(data);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

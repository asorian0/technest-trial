import {
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

import { BitcoinService } from '../bitcoin/shared/bitcoin.service';

import { AccountService } from './shared/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  @HostBinding('class')
  public hostClass =
    'position-absolute w-100 h-100 overflow-auto d-flex flex-column p-3';

  @ViewChild(MatSort)
  public sort: MatSort;
  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public data: MatTableDataSource<any>;
  public columnsToDisplay: string[] = [
    'accountName',
    'category',
    'tags',
    'balance',
    'availableBalance',
  ];
  public pageSizeOptions: number[] = [25, 50, 100];
  public currentBitcoin = 0;

  constructor(
    private readonly service: AccountService,
    private readonly bitcoin: BitcoinService,
  ) {}

  public ngOnInit(): void {
    this.bitcoin.currentValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentBitcoin) => (this.currentBitcoin = currentBitcoin));
    this.service
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
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

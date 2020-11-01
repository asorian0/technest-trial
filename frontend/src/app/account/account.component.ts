import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Account } from 'technest-trial-shared/model/account.model';

import { BitcoinService } from '../bitcoin/shared/bitcoin.service';

import { AccountQuery } from './shared/account.query';
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

  public data: MatTableDataSource<Account> = new MatTableDataSource([]);
  public columnsToDisplay: string[] = [
    'accountName',
    'category',
    'tags',
    'balance',
    'availableBalance',
  ];
  public pageSizeOptions: number[] = [25, 50, 100];
  public currentBitcoinRate = 0;

  constructor(
    private readonly service: AccountService,
    private readonly bitcoin: BitcoinService,
    private readonly query: AccountQuery,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  public ngOnInit(): void {
    this.bitcoin.currentValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (currentBitcoin) => (this.currentBitcoinRate = currentBitcoin),
      );
    this.service
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.updateTable(data);
      });
    this.query.all$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.updateTable(data);
    });
    this.query.active$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      // Performs cleanup of CSS class to allow further animation executions
      this.renderer.removeClass(
        this.document.querySelector(`.${data.status}`),
        data.status,
      );
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTable(data: Account[]): void {
    this.data = new MatTableDataSource(data);
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }
}

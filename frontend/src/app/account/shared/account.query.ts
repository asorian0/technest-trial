import { Injectable, OnDestroy } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AccountState } from './account.state';
import { AccountStore } from './account.store';

@Injectable({
  providedIn: 'root',
})
export class AccountQuery
  extends QueryEntity<AccountState>
  implements OnDestroy {
  private readonly destroy$ = new Subject();

  public readonly active$ = this.selectActive().pipe(
    takeUntil(this.destroy$),
    filter((data) => data != null),
  );
  public readonly all$ = this.selectAll().pipe(takeUntil(this.destroy$));

  constructor(protected store: AccountStore) {
    super(store);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

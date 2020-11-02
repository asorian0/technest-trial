import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { QueryEntity } from '@datorama/akita';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Account } from 'technest-trial-shared/model/account.model';

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
  public readonly current$ = new ReplaySubject<Account>(1);

  constructor(protected store: AccountStore, private readonly router: Router) {
    super(store);

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const match = event.url.match(/accounts\/(.+)/);
        this.current$.next(match && match[1] ? this.getEntity(match[1]) : null);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

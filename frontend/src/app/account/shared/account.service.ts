import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AccountStatus } from 'technest-trial-shared/enum/account-status.enum';
import { Account } from 'technest-trial-shared/model/account.model';

import { environment } from '../../../environments/environment';

import { AccountStore } from './account.store';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly api = 'account';

  constructor(
    private readonly http: HttpClient,
    private readonly store: AccountStore,
  ) {
    this.list().subscribe();
  }

  public list(): Observable<Account[]> {
    return this.http
      .get<Account[]>(`${environment.apiUrl}/${this.api}`)
      .pipe(tap((data) => this.store.set(data)));
  }

  public update(account: Account): any {
    this.store.upsert(account._id, (old) => ({
      ...account,
      status: this.calculateAvailableBalanceChange(
        old.availableBalance,
        account.availableBalance,
      ),
    }));
    this.store.setActive(account._id);
  }

  private calculateAvailableBalanceChange(
    oldBalance: number,
    newBalance: number,
  ): AccountStatus {
    if (oldBalance > newBalance) {
      return AccountStatus.Lower;
    } else if (oldBalance < newBalance) {
      return AccountStatus.Higher;
    }
    return AccountStatus.Unchanged;
  }
}

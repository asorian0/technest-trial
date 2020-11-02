import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { takeUntil } from 'rxjs/operators';

import { AccountState } from './account.state';

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'account', idKey: '_id' })
export class AccountStore extends EntityStore<AccountState> {
  constructor() {
    super([]);
  }
}

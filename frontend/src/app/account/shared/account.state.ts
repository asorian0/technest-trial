import { ActiveState, EntityState } from '@datorama/akita';
import { Account } from 'technest-trial-shared/model/account.model';

export interface AccountState
  extends EntityState<Account, string>,
    ActiveState {}

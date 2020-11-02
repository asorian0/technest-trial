import { AccountStatus } from '../enum/account-status.enum';

import { AccountTransaction } from './account-transaction.model';

export interface Account {
  _id?: string;
  accountName: string;
  category: string;
  tags: string;
  balance: number;
  availableBalance: number;
  status?: AccountStatus;
  transactions?: AccountTransaction[];
}

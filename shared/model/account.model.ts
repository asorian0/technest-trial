import { AccountStatus } from '../enum/account-status.enum';

export interface Account {
  _id?: string;
  accountName: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
  status?: AccountStatus;
}

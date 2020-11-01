import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { finance, random } from 'faker';
import { Model } from 'mongoose';
import { from, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account as AccountModel } from 'technest-trial-shared/model/account.model';

import { Account } from './schemas/account.schema';

@Injectable()
export class AccountService {
  public updatedAccount = new ReplaySubject<AccountModel>();

  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  public findAll(): Observable<Account[]> {
    return from(this.accountModel.find().exec());
  }

  public update(): Observable<Account> {
    return this.findAll().pipe(
      map((accounts) => {
        const randomIndex = random.number({
          min: 0,
          max: accounts.length - 1,
        });
        const chosenAccount = accounts[randomIndex];

        chosenAccount.balance = finance.amount();
        chosenAccount.availableBalance = finance.amount(
          0,
          Number(chosenAccount.balance),
        );

        return chosenAccount;
      }),
    );
  }
}

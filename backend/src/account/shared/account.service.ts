import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  public create(data: CreateAccountDto): Observable<Account> {
    const created = new this.accountModel(data);
    return from(created.save());
  }

  public findAll(): Observable<Account[]> {
    return from(this.accountModel.find().exec());
  }
}

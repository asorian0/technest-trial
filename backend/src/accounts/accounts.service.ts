import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private readonly accountModel: Model<Account>) {}

  async create(data: CreateAccountDto): Promise<Account> {
    const created = new this.accountModel(data);
    return created.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
}

import { connect } from 'mongoose';
import { finance, internet, random } from 'faker';
import { green, red } from 'colors';

import * as config from '../../config.json';
import { Account } from '../account/shared/schemas/account.schema';

async function seed(): Promise<void> {
  const connection = await connect(config.database.URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const accountModel = connection.model(Account.name, Account.pojo);
  const accounts = createAccounts();

  await accountModel.create(accounts);
}

function createAccounts(): Account[] {
  const accounts = [];

  for (let i = 0; i < config.seed.count; i++) {
    const balance = finance.amount();
    const account = {
      balance,
      accountName: internet.userName(),
      category: finance.transactionType(),
      tags: random.word(),
      availableBalance: finance.amount(0, Number(balance)),
    };

    accounts.push(account);
  }

  return accounts;
}

seed().then(() => console.log(green('Seeding success')))
  .catch(e => console.error(red(e)))
  .finally(() => process.exit());
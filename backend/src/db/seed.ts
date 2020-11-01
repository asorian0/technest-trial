import { connect, Schema } from 'mongoose';
import { date, finance, internet, random } from 'faker';
import { green, red } from 'colors';
import { Account } from 'technest-trial-shared/model/account.model';

import * as config from '../../config.json';

import { Account as AccountSchema } from '../account/shared/schemas/account.schema';

async function seed(): Promise<void> {
  const connection = await connect(config.database.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const accountModel = connection.model(
    AccountSchema.name,
    (AccountSchema.pojo as unknown) as Schema<AccountSchema>,
  );
  const accounts = createAccounts();

  await accountModel.create(accounts);
}

function createAccounts(): Account[] {
  const accounts: Account[] = [];

  for (let i = 0; i < config.seed.count; i++) {
    const balance = Number(finance.amount(0, 3, 8));
    const transactionsCount = random.number({
      min: 5,
      max: 10,
    });
    const transactions = [];

    for (let j = 0; j < transactionsCount; j++) {
      const isDebit = random.boolean();
      const debitOrCredit = Number(finance.amount(0, balance, 8));

      transactions.push({
        confirmedDate: date.recent(),
        orderId: random.alphaNumeric(6).toUpperCase(),
        orderCode: random.word().toUpperCase(),
        transactionType: finance.transactionType(),
        debit: isDebit ? debitOrCredit : null,
        credit: isDebit ? null : debitOrCredit,
        balance: isDebit ? balance - debitOrCredit : balance + debitOrCredit,
      });
    }

    accounts.push({
      balance,
      transactions,
      accountName: internet.userName(),
      category: finance.transactionType(),
      tags: random.word(),
      availableBalance: Number(finance.amount(0, balance, 8)),
    });
  }

  return accounts;
}

seed()
  .then(() => console.log(green('Seeding success')))
  .catch((e) => console.error(red(e)))
  .finally(() => process.exit());

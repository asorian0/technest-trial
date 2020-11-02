import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountTransaction } from 'technest-trial-shared/model/account-transaction.model';

import { AccountTransactionSchema } from './account-transaction.schema';

@Schema()
export class Account extends Document {
  @Prop({ required: true })
  accountName: string;
  @Prop()
  category: string;
  @Prop()
  tags: string;
  @Prop({ required: true })
  balance: string;
  @Prop({ required: true })
  availableBalance: string;
  @Prop({ type: [AccountTransactionSchema], default: [] })
  transactions: AccountTransaction[];

  public static pojo = {
    accountName: String,
    category: String,
    tags: String,
    balance: String,
    availableBalance: String,
    transactions: [AccountTransactionSchema],
    // transactions: [{
    //   confirmedDate: Date,
    //   orderId: String,
    //   orderCode: String,
    //   transactionType: String,
    //   debit: Number,
    //   credit: Number,
    //   balance: Number,
    // }],
  };
}

export const AccountSchema = SchemaFactory.createForClass(Account);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AccountTransaction extends Document {
  @Prop()
  confirmedDate: Date;
  @Prop()
  orderId: string;
  @Prop()
  orderCode: string;
  @Prop()
  transactionType: string;
  @Prop()
  debit: number;
  @Prop()
  credit: number;
  @Prop()
  balance: number;
}

export const AccountTransactionSchema = SchemaFactory.createForClass(
  AccountTransaction,
);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  public static pojo: any = {
    accountName: String,
    category: String,
    tags: String,
    balance: String,
    availableBalance: String,
  }
}

export const AccountSchema = SchemaFactory.createForClass(Account);

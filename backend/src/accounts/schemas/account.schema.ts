import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ auto: true })
  id: string;
  @Prop({ required: true })
  accountName: string;
  @Prop()
  category: string;
  @Prop()
  tag: string;
  @Prop({ required: true })
  balance: string;
  @Prop({ required: true })
  availableBalance: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as config from '../config.json';

import { AccountModule } from './account/account.module';
import { AppGateway } from './app.gateway';
import { BitcoinModule } from './bitcoin/bitcoin.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.URL),
    AccountModule,
    BitcoinModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}

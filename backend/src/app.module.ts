import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as config from '../config.json';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.URL),
    AccountModule,
    BitcoinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

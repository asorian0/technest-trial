import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

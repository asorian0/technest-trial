import { Module } from '@nestjs/common';

import { BitcoinController } from './bitcoin.controller';
import { BitcoinService } from './shared/bitcoin.service';

@Module({
  controllers: [BitcoinController],
  providers: [BitcoinService],
})
export class BitcoinModule {}

import { Module } from '@nestjs/common';

import { BitcoinController } from './bitcoin.controller';
import { BitcoinService } from './shared/bitcoin.service';

@Module({
  controllers: [BitcoinController],
  providers: [BitcoinService],
  exports: [BitcoinService],
})
export class BitcoinModule {}

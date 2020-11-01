import { Module } from '@nestjs/common';

import { BitcoinController } from './bitcoin.controller';
import { BitcoinGateway } from './bitcoin.gateway';
import { BitcoinService } from './shared/bitcoin.service';

@Module({
  controllers: [BitcoinController],
  providers: [BitcoinService, BitcoinGateway],
})
export class BitcoinModule {}

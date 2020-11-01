import { OnModuleDestroy } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as WebSocket from 'ws';

import { BitcoinService } from './shared/bitcoin.service';

@WebSocketGateway()
export class BitcoinGateway implements OnGatewayInit, OnModuleDestroy {
  private readonly destroy$ = new Subject();
  private readonly messageBitcoin = 'bitcoin';
  private readonly interval = 30000;

  constructor(private readonly service: BitcoinService) {
  }

  public afterInit(server: WebSocket.Server): void {
    interval(this.interval).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.service.getCurrentBitcoinValue().subscribe(value => {
        server.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event: this.messageBitcoin, data: value }));
          }
        });
      });
    });
  }

  public onModuleDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
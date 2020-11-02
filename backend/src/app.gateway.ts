import { OnModuleDestroy } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { random } from 'faker';
import { interval, ReplaySubject, Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import * as WebSocket from 'ws';

import { AccountService } from './account/shared/account.service';
import { BitcoinService } from './bitcoin/shared/bitcoin.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnModuleDestroy {
  private readonly destroy$ = new Subject();
  private readonly triggerUpdate = new ReplaySubject();
  private readonly messageBitcoin = 'bitcoin';
  private readonly messageAccountUpdate = 'updateAccount';
  private readonly interval = 30000;
  private readonly minTimeout = 20000;
  private readonly maxTimeout = 40000;
  private readonly precisionTimeout = 1000;

  constructor(
    private readonly bitcoinService: BitcoinService,
    private readonly accountService: AccountService,
  ) {}

  public afterInit(server: WebSocket.Server): void {
    interval(this.interval)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.bitcoinService.getCurrentBitcoinValue().subscribe((value) => {
          // broadcast to make sure every instance consumes it
          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ event: this.messageBitcoin, data: value }),
              );
            }
          });
        });
      });
    this.triggerUpdate
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.feedUpdates(server));
    this.triggerUpdate.next();
  }

  public onModuleDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private feedUpdates(server: WebSocket.Server): void {
    const updateTimeout = random.number({
      min: this.minTimeout,
      max: this.maxTimeout,
      precision: this.precisionTimeout,
    });

    timer(updateTimeout)
      .pipe(take(1))
      .subscribe(() => {
        this.accountService.update().subscribe((account) => {
          // broadcast to make sure every instance consumes it
          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  event: this.messageAccountUpdate,
                  data: account,
                }),
              );
            }
          });
          this.triggerUpdate.next();
        });
      });
  }
}

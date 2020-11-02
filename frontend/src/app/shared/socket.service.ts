import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

import { AccountService } from '../account/shared/account.service';
import { BitcoinService } from '../bitcoin/shared/bitcoin.service';

import { twoSecMillis } from './shared.const';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: WebSocket;

  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly bitcoinService: BitcoinService,
    private readonly accountService: AccountService,
  ) {}

  public start(): void {
    this.socket = new WebSocket(environment.wsUrl);
    this.socket.onmessage = (message) => {
      const response = JSON.parse(message.data);

      switch (response.event) {
        case 'bitcoin':
          this.bitcoinService.currentValue$.next(response.data);
          this.snackbar.open(`Bitcoin exchange value updated`, 'Close', {
            duration: twoSecMillis,
          });
          break;
        case 'updateAccount':
          this.accountService.update(response.data);
          break;
        default:
          console.log(
            `Unkwnow event ${response.event} received through WebSocket`,
          );
          break;
      }
    };
    this.socket.onerror = () => {
      this.snackbar.open(`WebSocket error`, 'Close', {
        duration: twoSecMillis,
      });
    };
    this.socket.onclose = () => {
      this.snackbar.open(`WebSocket connection down`, 'Close', {
        duration: twoSecMillis,
      });
    };
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ event: 'bitcoin' }));
    };
  }
}

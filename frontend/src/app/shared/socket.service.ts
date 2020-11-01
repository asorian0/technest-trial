import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../account/shared/account.service';
import { BitcoinService } from '../bitcoin/shared/bitcoin.service';

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
    this.socket = new WebSocket('ws://localhost:3000');
    this.socket.onmessage = (message) => {
      const response = JSON.parse(message.data);

      switch (response.event) {
        case 'bitcoin':
          this.bitcoinService.currentValue$.next(response.data);
          this.snackbar.open(`Bitcoin exchange value updated`, 'Close', {
            duration: 2000,
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
      this.snackbar.open(`WebSocket error`, 'Close', { duration: 2000 });
    };
    this.socket.onclose = () => {
      this.snackbar.open(`WebSocket connection down`, 'Close', {
        duration: 2000,
      });
    };
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ event: 'bitcoin' }));
    };
  }
}

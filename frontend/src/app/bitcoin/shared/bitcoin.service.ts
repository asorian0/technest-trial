import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private readonly api = 'bitcoin';

  public readonly currentValue$ = new ReplaySubject<number>(1);

  public socket: WebSocket;

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: MatSnackBar,
  ) {
    this.currentValue().subscribe((response) => {
      this.currentValue$.next(response.data);
    });
    this.socket = new WebSocket('ws://localhost:3000');
    this.socket.onmessage = (message) => {
      const response = JSON.parse(message.data);
      this.currentValue$.next(response.data);
    };
    this.socket.onerror = () => {
      this.snackbar.open(`WebSocket error`, 'Close', { duration: 2000 });
      // debugger;
    };
    this.socket.onclose = () => {
      // debugger;
    };
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ event: 'bitcoin' }));
    };
  }

  public currentValue(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.api}`);
  }
}

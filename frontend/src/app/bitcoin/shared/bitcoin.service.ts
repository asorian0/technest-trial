import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Response } from 'technest-trial-shared/model/response.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private readonly api = 'bitcoin';

  public readonly currentValue$ = new ReplaySubject<number>(1);

  constructor(private readonly http: HttpClient) {
    this.currentValue().subscribe((response) => {
      this.currentValue$.next(response.data);
    });
  }

  public currentValue(): Observable<Response<number>> {
    return this.http.get<Response<number>>(`${environment.apiUrl}/${this.api}`);
  }
}

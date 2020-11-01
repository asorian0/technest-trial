import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'technest-trial-shared/model/account.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly api = 'account';

  constructor(private readonly http: HttpClient) {}

  public list(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/${this.api}`);
  }
}

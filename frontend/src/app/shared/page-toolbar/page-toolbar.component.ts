import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'technest-trial-shared/model/account.model';

import { AccountQuery } from '../../account/shared/account.query';

@Component({
  selector: 'app-page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.scss'],
})
export class PageToolbarComponent {
  public current$: Observable<Account>;

  constructor(private readonly accountQuery: AccountQuery) {
    this.current$ = this.accountQuery.current$;
  }
}

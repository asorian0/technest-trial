import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AccountService } from './shared/account.service';
import { Account } from './shared/schemas/account.schema';

@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {
  }

  @Get()
  public list(): Observable<Account[]> {
    return this.service.findAll();
  }
}

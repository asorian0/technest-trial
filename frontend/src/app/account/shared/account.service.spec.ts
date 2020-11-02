import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AccountStatus } from 'technest-trial-shared/enum/account-status.enum';
import { Account } from 'technest-trial-shared/model/account.model';

import { AccountService } from './account.service';
import { AccountStore } from './account.store';
import { validData } from './shared-spec';
import createSpy = jasmine.createSpy;

describe('AccountService', () => {
  let service: AccountService;
  let httpClientStub;
  let accountStoreStub;

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj(HttpClient, ['get']);
    httpClientStub.get.and.returnValue(of(validData));

    accountStoreStub = jasmine.createSpyObj(AccountStore, [
      'upsert',
      'setActive',
      'set',
    ]);
    accountStoreStub.upsert = createSpy();

    service = new AccountService(httpClientStub, accountStoreStub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do http.get() and store.set() data when invoking .list()', () => {
    service.list();

    expect(httpClientStub.get).toHaveBeenCalled();
    expect(accountStoreStub.set).toHaveBeenCalledWith(validData);
  });

  it('should do store.upsert() and store.setActive() when .update() is invoked', () => {
    service.update(validData[0] as Account);

    expect(accountStoreStub.upsert).toHaveBeenCalled();
    expect(accountStoreStub.upsert.calls.mostRecent().args[0]).toBe(
      validData[0]._id,
    );
    expect(accountStoreStub.setActive).toHaveBeenCalledWith(validData[0]._id);
  });

  it('should return AccountStatus.Unchanged on calculateAvailableBalanceChange()', () => {
    const result = service.calculateAvailableBalanceChange(1, 1);

    expect(result).toEqual(AccountStatus.Unchanged);
  });

  it('should return AccountStatus.Lower on calculateAvailableBalanceChange()', () => {
    const result = service.calculateAvailableBalanceChange(2, 1);

    expect(result).toEqual(AccountStatus.Lower);
  });

  it('should return AccountStatus.Higher on calculateAvailableBalanceChange()', () => {
    const result = service.calculateAvailableBalanceChange(1, 2);

    expect(result).toEqual(AccountStatus.Higher);
  });
});

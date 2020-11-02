import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject } from 'rxjs';

import { BitcoinService } from '../../bitcoin/shared/bitcoin.service';
import { CssClassCleanerService } from '../../shared/css-class-cleaner.service';
import { MaterialModule } from '../../shared/material.module';
import { AccountQuery } from '../shared/account.query';
import { validData } from '../shared/shared-spec';

import { AccountListComponent } from './account-list.component';

describe('AccountComponent', () => {
  const queryServiceStub = {
    active$: new ReplaySubject(),
    all$: new ReplaySubject(),
  };
  const active = { status: 'status' };

  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let bitcoinService;
  let queryService;
  let cleanerService;

  beforeEach(async () => {
    bitcoinService = {
      currentValue$: new ReplaySubject(1),
    };

    await TestBed.configureTestingModule({
      declarations: [AccountListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        {
          provide: BitcoinService,
          useValue: bitcoinService,
        },
        {
          provide: AccountQuery,
          useValue: queryServiceStub,
        },
        CssClassCleanerService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    queryService = TestBed.inject(AccountQuery);
    cleanerService = TestBed.inject(CssClassCleanerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to queryService.active$ onInit and invoke cleanerService.cleanElementWithClass on emitted value', () => {
    const spy = spyOn(cleanerService, 'cleanElementWithClass');

    component.ngOnInit();
    queryService.active$.next(active);

    expect(spy).toHaveBeenCalledWith(active.status);
  });

  it('should subscribe to queryService.all$ AfterViewInit and store table data', () => {
    component.ngAfterViewInit();
    queryService.all$.next(validData);

    expect(component.data).toBeDefined();
    expect(component.data.data.length).toBe(validData.length);
    expect(component.data.data[0].accountName).toBe(validData[0].accountName);
  });
});

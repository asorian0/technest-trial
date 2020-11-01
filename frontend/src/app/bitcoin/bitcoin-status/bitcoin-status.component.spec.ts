import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinStatusComponent } from './bitcoin-status.component';

describe('BitcoinStatusComponent', () => {
  let component: BitcoinStatusComponent;
  let fixture: ComponentFixture<BitcoinStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BitcoinStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

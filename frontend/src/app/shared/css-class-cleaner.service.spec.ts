import { TestBed } from '@angular/core/testing';

import { CssClassCleanerService } from './css-class-cleaner.service';

describe('CssClassCleanerService', () => {
  let service: CssClassCleanerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssClassCleanerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

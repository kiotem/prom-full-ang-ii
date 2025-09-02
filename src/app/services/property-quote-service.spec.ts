import { TestBed } from '@angular/core/testing';

import { PropertyQuoteService } from './property-quote-service';

describe('PropertyQuoteService', () => {
  let service: PropertyQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

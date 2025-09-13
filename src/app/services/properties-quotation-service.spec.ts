import { TestBed } from '@angular/core/testing';

import { PropertiesQuotationService } from './properties-quotation-service';

describe('PropertiesQuotationService', () => {
  let service: PropertiesQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

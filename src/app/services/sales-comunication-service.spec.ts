import { TestBed } from '@angular/core/testing';

import { SalesComunicationService } from './sales-comunication-service';

describe('SalesComunicationService', () => {
  let service: SalesComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

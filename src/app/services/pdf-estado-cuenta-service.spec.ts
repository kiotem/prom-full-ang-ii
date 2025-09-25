import { TestBed } from '@angular/core/testing';

import { PDFEstadoCuentaService } from './pdf-estado-cuenta-service';

describe('PDFEstadoCuentaService', () => {
  let service: PDFEstadoCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PDFEstadoCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

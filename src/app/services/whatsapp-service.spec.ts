import { TestBed } from '@angular/core/testing';

import { WhatsAppService } from './whatsapp-service';

describe('WhatsAppService', () => {
  let service: WhatsAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

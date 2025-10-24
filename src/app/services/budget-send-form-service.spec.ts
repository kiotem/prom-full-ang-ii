import { TestBed } from '@angular/core/testing';

import { BudgetSendFormService } from './budget-send-form-service';

describe('BudgetSendFormService', () => {
  let service: BudgetSendFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetSendFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

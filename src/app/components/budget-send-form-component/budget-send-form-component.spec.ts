import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSendFormComponent } from './budget-send-form-component';

describe('BudgetSendFormComponent', () => {
  let component: BudgetSendFormComponent;
  let fixture: ComponentFixture<BudgetSendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetSendFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

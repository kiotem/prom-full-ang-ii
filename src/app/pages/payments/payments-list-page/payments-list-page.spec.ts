import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsListPage } from './payments-list-page';

describe('PaymentsListPage', () => {
  let component: PaymentsListPage;
  let fixture: ComponentFixture<PaymentsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

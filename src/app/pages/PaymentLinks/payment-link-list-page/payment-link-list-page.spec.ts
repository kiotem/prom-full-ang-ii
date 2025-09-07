import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLinkListPage } from './payment-link-list-page';

describe('PaymentLinkListPage', () => {
  let component: PaymentLinkListPage;
  let fixture: ComponentFixture<PaymentLinkListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLinkListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLinkListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

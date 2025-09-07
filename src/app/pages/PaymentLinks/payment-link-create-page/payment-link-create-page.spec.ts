import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLinkCreatePage } from './payment-link-create-page';

describe('PaymentLinkCreatePage', () => {
  let component: PaymentLinkCreatePage;
  let fixture: ComponentFixture<PaymentLinkCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLinkCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLinkCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

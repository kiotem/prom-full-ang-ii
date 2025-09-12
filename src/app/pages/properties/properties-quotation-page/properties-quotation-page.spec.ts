import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesQuotationPage } from './properties-quotation-page';

describe('PropertiesQuotationPage', () => {
  let component: PropertiesQuotationPage;
  let fixture: ComponentFixture<PropertiesQuotationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesQuotationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesQuotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesQuotationListPage } from './properties-quotation-list-page';

describe('PropertiesQuotationListPage', () => {
  let component: PropertiesQuotationListPage;
  let fixture: ComponentFixture<PropertiesQuotationListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesQuotationListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesQuotationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

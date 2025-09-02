import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesQuotePage } from './properties-quote-page';

describe('PropertiesQuotePage', () => {
  let component: PropertiesQuotePage;
  let fixture: ComponentFixture<PropertiesQuotePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesQuotePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesQuotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyQuoteFormComponent } from './property-quote-form-component';

describe('PropertyQuoteFormComponent', () => {
  let component: PropertyQuoteFormComponent;
  let fixture: ComponentFixture<PropertyQuoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyQuoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyQuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

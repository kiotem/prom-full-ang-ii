import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyQuoteCardComponent } from './property-quote-card-component';

describe('PropertyQuoteCardComponent', () => {
  let component: PropertyQuoteCardComponent;
  let fixture: ComponentFixture<PropertyQuoteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyQuoteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyQuoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

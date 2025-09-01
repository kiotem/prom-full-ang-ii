import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesMapPage } from './properties-map-page';

describe('PropertiesMapPage', () => {
  let component: PropertiesMapPage;
  let fixture: ComponentFixture<PropertiesMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesMapPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

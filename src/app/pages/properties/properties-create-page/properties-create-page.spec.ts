import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCreatePage } from './properties-create-page';

describe('PropertiesCreatePage', () => {
  let component: PropertiesCreatePage;
  let fixture: ComponentFixture<PropertiesCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

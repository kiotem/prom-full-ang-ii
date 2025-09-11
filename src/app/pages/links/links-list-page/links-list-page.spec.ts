import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksListPage } from './links-list-page';

describe('LinksListPage', () => {
  let component: LinksListPage;
  let fixture: ComponentFixture<LinksListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

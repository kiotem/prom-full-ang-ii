import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsListPage } from './budgets-list-page';

describe('BudgetsListPage', () => {
  let component: BudgetsListPage;
  let fixture: ComponentFixture<BudgetsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

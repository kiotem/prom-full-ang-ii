import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCreatePage } from './clients-create-page';

describe('ClientsCreatePage', () => {
  let component: ClientsCreatePage;
  let fixture: ComponentFixture<ClientsCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

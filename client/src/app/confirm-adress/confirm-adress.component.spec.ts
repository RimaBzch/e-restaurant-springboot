import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAdressComponent } from './confirm-adress.component';

describe('ConfirmAdressComponent', () => {
  let component: ConfirmAdressComponent;
  let fixture: ComponentFixture<ConfirmAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentOrderStatusComponent } from './user-current-order-status.component';

describe('UserCurrentOrderStatusComponent', () => {
  let component: UserCurrentOrderStatusComponent;
  let fixture: ComponentFixture<UserCurrentOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCurrentOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCurrentOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

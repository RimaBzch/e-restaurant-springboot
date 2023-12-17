import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordUserComponent } from './dashbord-user.component';

describe('DashbordUserComponent', () => {
  let component: DashbordUserComponent;
  let fixture: ComponentFixture<DashbordUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

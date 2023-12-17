import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionDashboardComponent } from './reception-dashboard.component';

describe('ReceptionDashboardComponent', () => {
  let component: ReceptionDashboardComponent;
  let fixture: ComponentFixture<ReceptionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

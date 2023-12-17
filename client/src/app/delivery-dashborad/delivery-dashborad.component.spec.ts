import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDashboradComponent } from './delivery-dashborad.component';

describe('DeliveryDashboradComponent', () => {
  let component: DeliveryDashboradComponent;
  let fixture: ComponentFixture<DeliveryDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryDashboradComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAssignedDeliveredMeComponent } from './delivery-assigned-delivered-me.component';

describe('DeliveryAssignedDeliveredMeComponent', () => {
  let component: DeliveryAssignedDeliveredMeComponent;
  let fixture: ComponentFixture<DeliveryAssignedDeliveredMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryAssignedDeliveredMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAssignedDeliveredMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

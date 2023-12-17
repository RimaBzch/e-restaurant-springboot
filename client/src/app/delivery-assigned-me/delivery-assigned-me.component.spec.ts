import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAssignedMeComponent } from './delivery-assigned-me.component';

describe('DeliveryAssignedMeComponent', () => {
  let component: DeliveryAssignedMeComponent;
  let fixture: ComponentFixture<DeliveryAssignedMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryAssignedMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAssignedMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

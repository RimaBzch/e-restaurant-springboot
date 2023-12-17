import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDRComponent } from './register-dr.component';

describe('RegisterDRComponent', () => {
  let component: RegisterDRComponent;
  let fixture: ComponentFixture<RegisterDRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

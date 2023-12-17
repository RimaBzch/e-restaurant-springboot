import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAdminComponent } from './side-bar-admin.component';

describe('SideBarAdminComponent', () => {
  let component: SideBarAdminComponent;
  let fixture: ComponentFixture<SideBarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

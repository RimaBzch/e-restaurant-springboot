import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCRUDComponent } from './product-crud.component';

describe('ProductCRUDComponent', () => {
  let component: ProductCRUDComponent;
  let fixture: ComponentFixture<ProductCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

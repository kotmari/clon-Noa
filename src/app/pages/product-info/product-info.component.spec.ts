import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        { provide: Firestore, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { ProductService } from 'src/shared/services/product/product.service';

import { ProductCategoryComponent } from './product-category.component';

describe('ProductCategoryComponent', () => {
  let component: ProductCategoryComponent;
  let fixture: ComponentFixture<ProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryComponent],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { ProductService}
      ]
    });
    fixture = TestBed.createComponent(ProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const afs: Firestore = TestBed.inject(Firestore);
    const collectionRef: CollectionReference = collection(afs, 'categories');
  });
});

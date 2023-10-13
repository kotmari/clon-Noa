import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { ProductInfoResolver } from './product-info.resolver';


describe('ProductResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        { provide: Firestore, useValue: {}}
      ]
    });
    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

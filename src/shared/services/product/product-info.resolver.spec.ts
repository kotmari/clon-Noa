import { TestBed } from '@angular/core/testing';

import { ProductInfoResolver } from './product-info.resolver';

describe('ProductResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productsResolver } from './products.resolver';
import { Product } from '../../Models/product';

describe('productsResolver', () => {
  const executeResolver: ResolveFn<Product[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

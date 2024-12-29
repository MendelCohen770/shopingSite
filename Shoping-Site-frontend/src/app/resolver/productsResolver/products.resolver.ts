import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Product } from '../../Models/product';
import { catchError, of } from 'rxjs';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const apiService = inject(ApiService);
  return apiService.getProducts().pipe(
    catchError((error: any) =>{
      console.log('error loading products', error);
      return of([]);
    }));
};

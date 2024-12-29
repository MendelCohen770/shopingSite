import { MaybeAsync, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { User } from '../../Models/user';
import { catchError, of } from 'rxjs';


export const allUsersResolver: ResolveFn<User[]> = (route, state) => {
  const apiService = inject(ApiService);

  return apiService.getAllUsers().pipe(
      catchError((error: any) =>{
        console.log('error loading products', error);
        return of([]);
      }));;
};

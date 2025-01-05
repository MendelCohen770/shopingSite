import { ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const userOnString = localStorage.getItem('user');
  if (userOnString) {
    return true;
  }else{
    return false;
  }
};

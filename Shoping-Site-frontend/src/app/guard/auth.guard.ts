import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.getTokenFromCookie() === null) {
    router.navigate(['login']);
    return false;
  }
  const currentRoute = state.root.firstChild?.children.find(child => child.url.length);
  const requiredRole = currentRoute?.data?.['role'];
  
  if (requiredRole && authService.getRole() !== requiredRole) {
    router.navigate(['/home/products'])
    return false;
  }
  return true;
};

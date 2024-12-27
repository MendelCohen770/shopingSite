import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole() === 'admin') {
    return true;
  } else {
    const lastUrl = localStorage.getItem('lastUrl');
    router.navigate([lastUrl]);
    return false;
  }
};

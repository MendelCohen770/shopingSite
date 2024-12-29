import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);

  return userService.getUserData();
};

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SignalRService } from '../services/signal-r/signal-r.service';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const signalRService = inject(SignalRService)
  const userOnString = localStorage.getItem('user');
  if (userOnString) {
    signalRService.startConnection();
    return true;
  }else{
    return false;
  }
};

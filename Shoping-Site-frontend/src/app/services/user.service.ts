import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  setTokenInCookie(token: string) {
    const expires = new Date();
    expires.setHours(expires.getHours() + 3);
    document.cookie = `MyToken=${token};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict;`;
  };

  getTokenFromCookie(): string | null {
    const name = "MyToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  };
  deleteTokenFromCookie(): void {
    document.cookie = "MyToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  };

}

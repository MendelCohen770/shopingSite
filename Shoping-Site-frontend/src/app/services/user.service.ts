import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: any = null;

  setUserData(data: any): void {
    this.userData = data;
  }
    // פונקציה לשמירה של טוקן בקוקי
setTokenInCookie(token: string) {
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // הגדרת תוקף של 1 שעה
  document.cookie = `MyToken=${token};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict;HttpOnly`;
}
// פונקציה לקרוא את הקוקי
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
}

  getUserData(): any {
    return this.userData;
  }

  clearUserData(): void {
    this.userData = null;
  }
  
}

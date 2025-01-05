// auth.service.ts
import { Injectable } from '@angular/core';
import { Role, User } from '../../Models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private STORAGE_KEY_USER = 'user';
  private user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    role: Role.user,
    isConnected: false
  };

  constructor() {
    this.loadLoginState();
  }
  
  isLoggedIn(): boolean {
    const userOnString = localStorage.getItem(this.STORAGE_KEY_USER);
    if(userOnString){
      this.user = JSON.parse(userOnString);
    }
    return this.user.isConnected;
  }

  getRole(): Role {
    const userOnString = localStorage.getItem(this.STORAGE_KEY_USER);
    if(userOnString){
      this.user = JSON.parse(userOnString);
    }
    return this.user.role;
  }


  login(userData: any) {
    const user: User = {...userData, isConnected: true};
    localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(user));
  }

  logout() {
    const userOnString = localStorage.getItem(this.STORAGE_KEY_USER);
    if(userOnString){
      this.user = JSON.parse(userOnString);
      this.user.isConnected = false;
    }
    localStorage.removeItem(this.STORAGE_KEY_USER);
  };

  private loadLoginState() {
    const userOnString = localStorage.getItem(this.STORAGE_KEY_USER);
    if(userOnString){
      this.user = JSON.parse(userOnString); 
      if (this.user.isConnected) {
        console.log('User is logged in:', this.user.username);
      } else {
        console.log('User is not logged in.');
      }
    } else {
      console.log('No user data found in local storage.');
      this.user = { id: 0, username: '', email: '',password: '', role: Role.user, isConnected: false };
    }
  };
  getTokenFromCookie(): string | null {
    const name = "AuthToken=";
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
}
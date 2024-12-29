// auth.service.ts
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../Models/user';

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
    role: '',
    isConnected: false
  };

  constructor(private userService: UserService) {
    this.loadLoginState();
  }
  
  isLoggedIn(): boolean {
    const userOnString = localStorage.getItem(this.STORAGE_KEY_USER);
    if(userOnString){
      this.user = JSON.parse(userOnString);
    }
    return this.user.isConnected;
  }

  getRole(): string {
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
    this.userService.deleteTokenFromCookie();
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
      this.user = { id: 0, username: '', email: '',password: '', role: '', isConnected: false };
    }
  }
}
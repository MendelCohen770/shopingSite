// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY_LOGGED_IN = 'isLoggedIn';
  private readonly STORAGE_KEY_ROLE = 'userRole';
  constructor() {
    this.loadLoginState();
  }
  private loggedIn: boolean = false;
  private role: string = 'user';
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getRole(): string {
    return this.role;
  }

  login(role: string) {
    this.loggedIn = true;
    this.role = role;
    localStorage.setItem(this.STORAGE_KEY_LOGGED_IN, 'true');
    localStorage.setItem(this.STORAGE_KEY_ROLE, role);
  }

  logout() {
    this.loggedIn = false;
    this.role = 'user';
    localStorage.removeItem(this.STORAGE_KEY_LOGGED_IN);
    localStorage.removeItem(this.STORAGE_KEY_ROLE);
  }
  private loadLoginState() {
    const savedState = localStorage.getItem(this.STORAGE_KEY_LOGGED_IN);
    const savedRole = localStorage.getItem(this.STORAGE_KEY_ROLE);
    this.loggedIn = savedState === 'true';
    this.role = savedRole || 'user';
  }
}
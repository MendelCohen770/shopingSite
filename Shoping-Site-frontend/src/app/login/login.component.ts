import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}
  username = '';
  password = '';

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // כאן תוכל להוסיף לוגיקה לקריאת API לאימות
  };
  navigateToHome(){
    this.router.navigate(['/products']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}

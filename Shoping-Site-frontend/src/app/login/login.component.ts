import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // כאן תוכל להוסיף לוגיקה לקריאת API לאימות
  }
}

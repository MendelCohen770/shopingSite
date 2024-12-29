import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  username = '';
  password = '';

  constructor(private router: Router, private apiService: ApiService, private userService: UserService,private authService: AuthService) {}
  
  onSubmit() {
    const userData = {
      username: this.username,
      password: this.password
    };
    this.apiService.login(userData).subscribe({
      next :(response) => {
        this.userService.setTokenInCookie(response.token)
        this.authService.login(response.user);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.log("Error in login User!!!", error);
      }
  });
  };
  
  navigateToSignup() {
    this.router.navigate(['/signup']);
  };
}

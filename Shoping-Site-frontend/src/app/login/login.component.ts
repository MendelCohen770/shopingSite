import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import {AuthService} from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  username = '';
  password = '';

  constructor(private router: Router,
     private apiService: ApiService,
      private authService: AuthService,
      private toastService: ToastService) {}
  
  onSubmit() {
    const userData = {
      username: this.username,
      password: this.password
    };
    this.apiService.login(userData).subscribe({
      next :(response) => {
        this.authService.login(response.user);
        this.toastService.success('Login Success!!')
        this.router.navigate(['home/products']);
      },
      error: (error) => {
        this.toastService.error('Error in Login!!')
        console.log(error);
      }
  });
  };
  
  navigateToSignup() {
    this.router.navigate(['/signup']);
  };
}

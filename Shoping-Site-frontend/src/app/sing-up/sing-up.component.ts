import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sing-up',
  imports: [FormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {

  username = '';
  email = '';
  password = '';

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() { 
       const lastUrl = localStorage.getItem('lastUrl'); 
       if (lastUrl) {
         this.router.navigate([lastUrl]); 
       } 
     }
  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    this.apiService.singUp(userData).subscribe({
      next :() => {
        console.log("singUp User Success!!!");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("Error in singUp User!!!", error);
      }
  })
  };
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
};

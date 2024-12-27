import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Shoping-Site';

  showLogout: boolean = false;
  showHome: boolean = false;
  showProductManagement: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.router.events.subscribe(
      event => { if (event instanceof NavigationEnd) { 
        localStorage.setItem('lastUrl', event.urlAfterRedirects); } 
      });
    this.router.events.subscribe(() => {
      const currentUrlForLogout = this.router.url;
      const currentUrlForHome = this.router.url;
      const currentUrlForProductManagement = this.router.url;
      const savedRole = localStorage.getItem('userRole');
      this.showLogout = currentUrlForLogout === '/products' || currentUrlForLogout === '/manage-products';
      this.showHome = currentUrlForHome === '/manage-products';
      this.showProductManagement = currentUrlForProductManagement === '/products' && savedRole === 'admin'
    });
   };

   logout(): void {
    this.apiService.logout().subscribe(()=>{
      console.log("logged out");
    });
    this.authService.logout();
    this.router.navigate(['']);
   }
   Home(): void {
    this.router.navigate(['/products'])
   };
   navigateToProductManagement() {
    this.router.navigate(['/manage-products'])
  };

}

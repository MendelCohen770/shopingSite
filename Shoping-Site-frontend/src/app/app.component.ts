import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/toast/toast.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Shopping-Site';

  showLogout: boolean = false;
  showHome: boolean = false;
  showProductManagement: boolean = false;
  showUsersStatus: boolean = false;

  constructor(private router: Router,
     private apiService: ApiService,
      private authService: AuthService,
       private toastService: ToastService,) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          localStorage.setItem('lastUrl', event.urlAfterRedirects);
        }
      });

    this.router.events.subscribe(() => {
      const role = this.authService.getRole();
      this.showLogout = this.router.url === '/products' || this.router.url === '/manage-products' || this.router.url === '/usersStatus';
      this.showHome = this.router.url === '/manage-products' || this.router.url === '/usersStatus';
      this.showProductManagement = (this.router.url === '/products' || this.router.url === '/usersStatus') && role === 'admin';
      this.showUsersStatus = (this.router.url === '/products' || this.router.url === '/manage-products') && role === 'admin';
    });
  };
 
  logout(): void {
    this.apiService.logout().subscribe({
      next: () => {
      this.authService.logout();
      this.toastService.success('logout successful');
      this.router.navigate(['']);
      }, error: (error) =>  {
        this.toastService.error('error to logout');
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['']);
      }
    });
  };
  Home(): void {
    this.router.navigate(['/products'])
  };
  navigateToProductManagement() {
    this.router.navigate(['/manage-products'])
  };
  navigateToUsersStatus() {
    this.router.navigate(['/usersStatus'])
  };

}

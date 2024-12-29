import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { flatMap } from 'rxjs';

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
  showUsersStatus: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
    this.router.events.subscribe(
      event => { if (event instanceof NavigationEnd) { 
        localStorage.setItem('lastUrl', event.urlAfterRedirects); } 
      });
    this.router.events.subscribe(() => {
      const savedRole = localStorage.getItem('userRole');
      this.showLogout = this.router.url === '/products' || this.router.url === '/manage-products' || this.router.url === '/usersStatus';
      this.showHome = this.router.url === '/manage-products' || this.router.url === '/usersStatus';
      this.showProductManagement = (this.router.url === '/products' || this.router.url === '/usersStatus') && savedRole === 'admin';
      this.showUsersStatus = (this.router.url === '/products' || this.router.url === '/manage-products') && savedRole === 'admin';
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
  navigateToUsersStatus(){
    this.router.navigate(['/usersStatus'])
  }

}

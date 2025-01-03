import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
import { ToastService } from '../services/toast/toast.service';
import { SignalRService } from '../services/signal-r/signal-r.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  showLogout: boolean = false;
  showHome: boolean = false;
  showProductManagement: boolean = false;
  showUsersStatus: boolean = false;

   constructor(private router: Router,
        private authService: AuthService,
      private apiService: ApiService,
     private toastService: ToastService,
     private route:  ActivatedRoute,
    private signalRService: SignalRService) {
  
      this.router.events.subscribe(() => {
        const role = this.authService.getRole();
        this.showLogout = this.router.url === '/home/products' || this.router.url === '/home/manage-products' || this.router.url === '/home/usersStatus';
        this.showHome = this.router.url === '/home/manage-products' || this.router.url === '/home/usersStatus';
        this.showProductManagement = (this.router.url === '/home/products' || this.router.url === '/home/usersStatus') && role === 'admin';
        this.showUsersStatus = (this.router.url === '/home/products' || this.router.url === '/home/manage-products') && role === 'admin';
      });
    };

    ngOnInit(){
      this.route.snapshot.data['user'];
      this.signalRService.startConnection();
    }
    ngOnDestroy(): void {
      this.signalRService.stopConnection();
    }
    Home(): void {
      this.router.navigate(['/home/products'])
    };
    navigateToProductManagement() {
      this.router.navigate(['/home/manage-products'])
    };
    navigateToUsersStatus() {
      this.router.navigate(['/home/usersStatus'])
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
}

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

  
 
  

}

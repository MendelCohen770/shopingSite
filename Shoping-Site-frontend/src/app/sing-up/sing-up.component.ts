import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  imports: [],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  constructor(private router: Router) {}

  navigateToSignup(){
    this.router.navigate(['/login']);
  }

}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {ProductsComponent} from './products/products.component'
import { ProductManagementComponent } from './product-management/product-management.component';
import {authGuard} from './guard/guardIsLoggedIn/auth.guard';
import {adminGuard} from './guard/guardAdmin/admin.guard'

export const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SingUpComponent },
      { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
      { path: 'manage-products', component: ProductManagementComponent, canActivate: [authGuard, adminGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
];

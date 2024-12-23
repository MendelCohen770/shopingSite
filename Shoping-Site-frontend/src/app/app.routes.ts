import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {ProductsComponent} from './products/products.component'
import { ProductManagementComponent } from './product-management/product-management.component';

export const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SingUpComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'manage-products', component: ProductManagementComponent }, // ניהול מוצרים
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // ברירת מחדל
];

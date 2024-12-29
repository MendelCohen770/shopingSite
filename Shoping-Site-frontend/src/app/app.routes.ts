import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {ProductsComponent} from './products/products.component'
import { ProductManagementComponent } from './product-management/product-management.component';
import {authGuard} from './guard/guardIsLoggedIn/auth.guard';
import {adminGuard} from './guard/guardAdmin/admin.guard'
import { userResolver } from './resolver/userResolver/user.resolver';
import { productsResolver } from './resolver/productsResolver/products.resolver';
import { UsersStatusComponent } from './users-status/users-status.component';
import { allUsersResolver } from './resolver/allUsersResolver/allUsers.resolver';

export const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SingUpComponent },
      { path: 'products', component: ProductsComponent, canActivate: [authGuard] , resolve: { user: userResolver, products: productsResolver}},
      { path: 'manage-products', component: ProductManagementComponent, canActivate: [authGuard, adminGuard], resolve: {products: productsResolver} },
      {path: 'usersStatus', component: UsersStatusComponent, canActivate: [authGuard, adminGuard], resolve: {allUsersResolver} },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
];

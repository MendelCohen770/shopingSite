import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sign-up/sing-up.component';
import { ProductsComponent } from './products/products.component'
import { ProductManagementComponent } from './product-management/product-management.component';
import { authGuard } from './guard/auth.guard';
import { userResolver } from './resolver/user.resolver';
import { UsersStatusComponent } from './users-status/users-status.component';
import { HomeComponent } from './home/home.component';
import { Role } from './Models/user';

export const routes: Routes = [

      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SingUpComponent },

      {
            path: 'home',
            component: HomeComponent,
            canActivate: [authGuard],
            resolve: { user: userResolver},
            children: [
                  { path: 'products', component: ProductsComponent, },
                  { path: 'manage-products', component: ProductManagementComponent, data: { role: Role.admin }},
                  { path: 'usersStatus', component: UsersStatusComponent, data: { role: Role.admin }},
            ]
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
];

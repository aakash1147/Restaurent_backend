import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RestaurantDetailComponent } from './features/restaurants/restaurant-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { OrdersComponent } from './features/orders/orders.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { RegisterComponent } from './features/user/components/register/register.component';
import { ForgotPasswordComponent } from './features/user/components/forgot-password/forgot-password.component';
import { AuthGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

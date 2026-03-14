import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { RestaurantListComponent } from './website/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './website/restaurant-detail/restaurant-detail.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutingModule) },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders = [provideRouter(routes)];

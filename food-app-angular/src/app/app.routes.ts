import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './website/home/home.component';


export const routes: Routes = [
  { path: '', loadChildren: () => import('./website/website.routes').then(m => m.WebsiteRoutingModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutingModule) },
  // { path: 'restaurants', component: RestaurantListComponent },
  // { path: 'restaurants/:id', component: RestaurantDetailComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders = [provideRouter(routes)];

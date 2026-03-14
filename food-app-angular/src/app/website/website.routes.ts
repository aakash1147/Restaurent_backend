import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";


const websiteRoutes: Routes = [
  { 
    path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      { path: 'restaurants', loadComponent: () => import('./restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent) },
      { path: 'restaurants/:id', loadComponent: () => import('./restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent) },
    ]
  },  
]

@NgModule({
  imports: [
    RouterModule.forChild(websiteRoutes)
  ]
})
export class WebsiteRoutingModule {}
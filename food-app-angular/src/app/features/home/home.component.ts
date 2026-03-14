import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../core/services';
import { Restaurant } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (response) => {
        this.restaurants = response.data;
      },
      error: (error) => {
        console.error('Error loading restaurants:', error);
      }
    });
  }

  onSearch(event: any): void {
    const query = event.target.value;
    if (query.length > 2) {
      this.restaurantService.searchRestaurants(query).subscribe({
        next: (response) => {
          this.restaurants = response.data;
        }
      });
    }
  }
}

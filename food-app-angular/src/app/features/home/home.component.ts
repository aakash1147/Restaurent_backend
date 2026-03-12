import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../core/services';
import { Restaurant } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <h1>Welcome to Food App</h1>
        <p>Discover delicious food from your favorite restaurants</p>
        <input
          type="text"
          placeholder="Search restaurants, food..."
          class="search-box"
          (input)="onSearch($event)"
        />
      </section>

      <section class="featured-restaurants">
        <h2>Featured Restaurants</h2>
        <div class="restaurants-grid">
          <div
            *ngFor="let restaurant of restaurants"
            class="restaurant-card"
            [routerLink]="['/restaurants', restaurant.id]"
          >
            <img [src]="restaurant.bannerImage" [alt]="restaurant.name" />
            <div class="card-content">
              <h3>{{ restaurant.name }}</h3>
              <p>{{ restaurant.cuisines.join(', ') }}</p>
              <div class="card-footer">
                <span class="rating">⭐ {{ restaurant.rating }}</span>
                <span class="delivery">{{ restaurant.deliveryTime }} min</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 20px;
    }

    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 3rem;
    }

    .hero h1 {
      margin: 0 0 1rem 0;
      font-size: 2.5rem;
    }

    .search-box {
      width: 100%;
      max-width: 500px;
      padding: 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      margin-top: 1rem;
    }

    .featured-restaurants h2 {
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .restaurant-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.3s;
      text-decoration: none;
      color: inherit;
    }

    .restaurant-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .restaurant-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 1rem;
    }

    .card-content h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .card-content p {
      margin: 0 0 1rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    .rating {
      font-weight: 600;
    }
  `]
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

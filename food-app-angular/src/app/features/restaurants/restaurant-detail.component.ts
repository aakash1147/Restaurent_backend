import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestaurantService } from '../../core/services';
import { CartService } from '../../core/services';
import { Restaurant } from '../../core/models';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="restaurant-detail">
      <div *ngIf="restaurant" class="container">
        <img [src]="restaurant.bannerImage" [alt]="restaurant.name" class="banner" />
        
        <div class="header">
          <h1>{{ restaurant.name }}</h1>
          <p>{{ restaurant.description }}</p>
          <div class="info">
            <span>⭐ {{ restaurant.rating }} ({{ restaurant.reviewCount }} reviews)</span>
            <span>⏱️ {{ restaurant.deliveryTime }} min</span>
            <span>💵 Delivery: ₹{{ restaurant.deliveryCharge }}</span>
          </div>
        </div>

        <div class="menu-section">
          <h2>Menu</h2>
          <div class="menu-grid" *ngIf="restaurant.menu && restaurant.menu.length > 0">
            <div *ngFor="let item of restaurant.menu" class="menu-item">
              <img [src]="item.image" [alt]="item.name" />
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="item-footer">
                <span class="price">₹{{ item.price }}</span>
                <button (click)="addToCart(item)" class="add-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .restaurant-detail {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 20px;
    }

    .banner {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .header {
      margin-bottom: 3rem;
    }

    .header h1 {
      margin: 0;
      font-size: 2rem;
    }

    .info {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
      color: #666;
    }

    .menu-section h2 {
      margin: 2rem 0 1.5rem 0;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .menu-item {
      background: white;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
    }

    .menu-item img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .price {
      font-weight: 600;
      color: #f44336;
      font-size: 1.1rem;
    }

    .add-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-btn:hover {
      background-color: #da190b;
    }
  `]
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | null = null;
  restaurantId: string = '';

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.loadRestaurant();
    });
  }

  loadRestaurant(): void {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (response) => {
        this.restaurant = response.data || null;
      },
      error: (error) => {
        console.error('Error loading restaurant:', error);
      }
    });
  }

  addToCart(item: any): void {
    this.cartService.addItemToCart(this.restaurantId, item.id, 1).subscribe({
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }
}

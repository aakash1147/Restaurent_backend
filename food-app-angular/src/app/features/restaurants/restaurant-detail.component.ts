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
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services';
import { Cart } from '../../core/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      error: (error) => {
        console.error('Error loading cart:', error);
      }
    });
  }

  increaseQuantity(itemId: string): void {
    const item = this.cart?.items.find(i => i.id === itemId);
    if (item) {
      this.cartService.updateCartItem(itemId, item.quantity + 1).subscribe();
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cart?.items.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateCartItem(itemId, item.quantity - 1).subscribe();
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeItemFromCart(itemId).subscribe();
  }
}

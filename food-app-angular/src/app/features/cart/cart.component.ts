import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services';
import { Cart } from '../../core/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-container">
      <h1>Shopping Cart</h1>
      
      <div *ngIf="cart; else emptyCart" class="cart-content">
        <div class="items-section">
          <div *ngFor="let item of cart.items" class="cart-item">
            <div class="item-info">
              <h3>{{ item.foodName }}</h3>
              <p>₹{{ item.price }} x {{ item.quantity }}</p>
            </div>
            <div class="item-actions">
              <button (click)="decreaseQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button (click)="increaseQuantity(item.id)">+</button>
              <button (click)="removeItem(item.id)" class="remove-btn">Remove</button>
            </div>
            <div class="item-total">
              ₹{{ item.subtotal }}
            </div>
          </div>
        </div>

        <div class="summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>₹{{ cart.subtotal }}</span>
          </div>
          <div class="summary-row">
            <span>Tax</span>
            <span>₹{{ cart.taxAmount }}</span>
          </div>
          <div class="summary-row">
            <span>Delivery Charge</span>
            <span>₹{{ cart.deliveryCharge }}</span>
          </div>
          <div *ngIf="cart.discountAmount > 0" class="summary-row discount">
            <span>Discount</span>
            <span>-₹{{ cart.discountAmount }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>₹{{ cart.total }}</span>
          </div>
          <button class="checkout-btn" routerLink="/checkout">Proceed to Checkout</button>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button routerLink="/restaurants" class="continue-shopping">Continue Shopping</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 20px;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 1fr auto 100px;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 1rem;
      align-items: center;
    }

    .item-actions button {
      padding: 0.25rem 0.5rem;
      margin: 0 0.25rem;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .remove-btn {
      background-color: #f44336;
      color: white;
      border-color: #f44336;
    }

    .summary {
      background: #f5f5f5;
      padding: 1.5rem;
      border-radius: 8px;
      height: fit-content;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .summary-row.total {
      border-top: 2px solid #ddd;
      padding-top: 0.5rem;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .checkout-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem;
    }

    .continue-shopping {
      background-color: #f44336;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
    }
  `]
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

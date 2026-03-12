import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services';
import { Order } from '../../core/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="orders-container">
      <h1>My Orders</h1>

      <div *ngIf="orders && orders.length > 0; else noOrders" class="orders-list">
        <div *ngFor="let order of orders" class="order-card" [routerLink]="['/orders', order.id]">
          <div class="order-header">
            <h3>Order #{{ order.id.slice(0, 8) }}</h3>
            <span class="status" [ngClass]="'status-' + order.status">{{ order.status }}</span>
          </div>
          <div class="order-details">
            <p><strong>Restaurant:</strong> Restaurant Name</p>
            <p><strong>Total:</strong> ₹{{ order.total }}</p>
            <p><strong>Date:</strong> {{ order.createdAt | date: 'medium' }}</p>
          </div>
          <div class="items-preview">
            <span *ngFor="let item of order.items.slice(0, 2)">{{ item.foodName }}, </span>
            <span *ngIf="order.items.length > 2">+{{ order.items.length - 2 }} more</span>
          </div>
        </div>
      </div>

      <ng-template #noOrders>
        <div class="no-orders">
          <p>No orders yet</p>
          <button routerLink="/restaurants" class="order-now">Order Now</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 20px;
    }

    .orders-list {
      display: grid;
      gap: 1rem;
    }

    .order-card {
      background: white;
      border: 1px solid #ddd;
      padding: 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: box-shadow 0.3s;
      text-decoration: none;
      color: inherit;
    }

    .order-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .status-pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-confirmed {
      background-color: #d1ecf1;
      color: #0c5460;
    }

    .status-preparing {
      background-color: #cfe2ff;
      color: #084298;
    }

    .status-out_for_delivery {
      background-color: #e2e3e5;
      color: #383d41;
    }

    .status-delivered {
      background-color: #d4edda;
      color: #155724;
    }

    .status-cancelled {
      background-color: #f8d7da;
      color: #721c24;
    }

    .no-orders {
      text-align: center;
      padding: 3rem;
    }

    .order-now {
      background-color: #f44336;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }
}

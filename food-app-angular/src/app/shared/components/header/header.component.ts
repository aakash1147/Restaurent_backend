import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';
import { selectCurrentUser, selectIsAuthenticated } from '../../../core/store/auth/auth.selectors';
import { logout } from '../../../core/store/auth/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar class="app-header">
      <div class="header-container">
        <div class="logo-section">
          <mat-icon class="logo-icon">local_dining</mat-icon>
          <span class="logo-text" routerLink="/">FoodDelivery</span>
        </div>

        <div class="search-section">
          <input
            type="text"
            placeholder="Search restaurants, food..."
            class="search-input"
            (input)="onSearch($event)"
          />
          <mat-icon>search</mat-icon>
        </div>

        <div class="nav-section">
          <button mat-icon-button routerLink="/cart" [matBadge]="(cartCount$ | async)" matBadgeSize="small">
            <mat-icon>shopping_cart</mat-icon>
          </button>

          <ng-container *ngIf="isAuthenticated$ | async">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>account_circle</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item routerLink="/profile">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </button>
              <button mat-menu-item routerLink="/orders">
                <mat-icon>assignment</mat-icon>
                <span>My Orders</span>
              </button>
              <button mat-menu-item routerLink="/favorites">
                <mat-icon>favorite</mat-icon>
                <span>Favorites</span>
              </button>
              <button mat-menu-item routerLink="/settings">
                <mat-icon>settings</mat-icon>
                <span>Settings</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="onLogout()">
                <mat-icon>logout</mat-icon>
                <span>Logout</span>
              </button>
            </mat-menu>
          </ng-container>

          <ng-container *ngIf="!(isAuthenticated$ | async)">
            <button mat-stroked-button routerLink="/auth/login" color="primary">
              Login
            </button>
            <button mat-raised-button routerLink="/auth/register" color="primary">
              Register
            </button>
          </ng-container>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      flex: 0 0 auto;
    }

    .logo-icon {
      font-size: 32px;
      color: #f44336;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .search-section {
      flex: 1;
      max-width: 300px;
      position: relative;
      margin: 0 40px;
    }

    .search-input {
      width: 100%;
      padding: 12px 40px 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      border-color: #f44336;
      box-shadow: 0 0 8px rgba(244, 67, 54, 0.2);
    }

    .search-section mat-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
    }

    .nav-section {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 0 0 auto;
    }

    @media (max-width: 768px) {
      .header-container {
        flex-wrap: wrap;
      }

      .search-section {
        max-width: none;
        margin: 0;
      }

      .logo-text {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;
  cartCount$ = new Observable<number>();

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}

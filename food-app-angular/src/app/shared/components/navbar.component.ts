import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <h1>🍔 Food App</h1>
        </div>
        <ul class="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#restaurants">Restaurants</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#profile">Profile</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #f44336;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .nav-menu {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 2rem;
    }

    .nav-menu a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s;
    }

    .nav-menu a:hover {
      opacity: 0.8;
    }
  `]
})
export class NavbarComponent {
  @Input() isAuthenticated = false;
}

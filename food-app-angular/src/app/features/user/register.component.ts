import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Register</h2>
        <form>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" class="register-btn">Register</button>
        </form>
        <p>Already have an account? <a routerLink="/auth/login">Login here</a></p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem 0;
    }

    .register-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .register-btn {
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

    .register-btn:hover {
      background-color: #da190b;
    }

    p {
      text-align: center;
      margin-top: 1rem;
    }

    a {
      color: #f44336;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent {}

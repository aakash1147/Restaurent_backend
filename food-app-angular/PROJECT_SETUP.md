# Food App - Angular Enterprise Application

A full-featured food delivery application (similar to Zomato & Swiggy) built with Angular 19, following enterprise-level best practices.

## Project Structure

```
food-app-angular/
├── src/
│   ├── app/
│   │   ├── core/                    # Core module (singleton services, guards, interceptors)
│   │   │   ├── constants/           # Application constants
│   │   │   ├── guards/              # Route guards (auth, role-based)
│   │   │   ├── interceptors/        # HTTP interceptors (auth, error handling)
│   │   │   ├── models/              # TypeScript interfaces and models
│   │   │   ├── services/            # Core services (auth, http, etc.)
│   │   │   └── index.ts             # Core module exports
│   │   ├── shared/                  # Shared features module
│   │   │   ├── components/          # Reusable components (navbar, footer, etc.)
│   │   │   ├── directives/          # Custom directives
│   │   │   ├── pipes/               # Custom pipes
│   │   │   └── index.ts             # Shared module exports
│   │   ├── features/                # Feature modules (lazy loaded)
│   │   │   ├── home/                # Home page
│   │   │   ├── restaurants/         # Restaurant listing & detail
│   │   │   ├── cart/                # Shopping cart
│   │   │   ├── orders/              # Order management
│   │   │   ├── user/                # User profile & auth
│   │   │   └── search/              # Search functionality
│   │   ├── layouts/                 # Layout components
│   │   ├── app.routes.ts            # Application routing
│   │   ├── app.config.ts            # Application configuration
│   │   ├── app.ts                   # Root component
│   │   └── app.html                 # Root template
│   ├── assets/                      # Static assets
│   │   ├── images/                  # Image assets
│   │   ├── icons/                   # SVG icons
│   │   └── styles/                  # Global stylesheets
│   ├── environments/                # Environment configurations
│   │   ├── environment.ts           # Development env
│   │   └── environment.prod.ts      # Production env
│   ├── main.ts                      # Application entry point
│   ├── index.html                   # HTML template
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # NPM dependencies
└── README.md                        # This file
```

## Core Modules & Architecture

### 1. Core Module
- **Models**: TypeScript interfaces for type safety
- **Services**: Authentication, Restaurant, Cart, Order management
- **Guards**: Authentication and role-based authorization
- **Interceptors**: JWT authentication and error handling
- **Constants**: Application-wide constants and configurations

### 2. Shared Module
- **Components**: Reusable UI components (NavBar, Footer, Toast, Loading Spinner)
- **Pipes**: Custom pipes for formatting (Currency, Safe HTML)
- **Directives**: Custom Angular directives

### 3. Feature Modules
Lazy-loaded modules for each major feature:
- **Home**: Landing page with featured restaurants
- **Restaurants**: Browse and filter restaurants, view details
- **Cart**: Shopping cart management
- **Orders**: Order history and tracking
- **User**: User profile and settings
- **Search**: Advanced search functionality

## Services

### AuthService
- User login & registration
- JWT token management
- Session persistence
- Observable-based state management

### RestaurantService
- Fetch all restaurants
- Get restaurant details
- Search restaurants
- Get nearby restaurants by location

### CartService
- Add/remove items from cart
- Update quantities
- Apply coupons
- Calculate totals

### OrderService
- Create new orders
- Track order status
- Cancel orders
- Order history

### LoadingService
- Global loading state management
- Loading spinner control

### ToastService
- Show success, error, warning, info toasts
- Automatic dismissal

## Request/Response Flow

All HTTP operations follow a standard request-response pattern with types:

```typescript
// API Request
interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: ErrorInfo;
  timestamp: Date;
}

// Paginated Response
interface PaginatedResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T[];
  pagination: PaginationInfo;
  timestamp: Date;
}
```

## Key Features

1. **Authentication & Authorization**
   - JWT token-based authentication
   - Role-based access control
   - Automatic token refresh
   - Session timeout handling

2. **Error Handling**
   - Global HTTP error interceptor
   - User-friendly error messages
   - Error logging

3. **Performance**
   - Lazy-loaded feature modules
   - Change detection optimization (Zoneless)
   - HTTP response caching

4. **Security**
   - Secure JWT token storage
   - HTTP interceptors for token injection
   - HTTPS enforcement (production)

5. **State Management**
   - RxJS Observables for reactive state
   - BehaviorSubject for state management
   - No external state management library (keep it light)

## API Integration

### Base URL Configuration
Update the API endpoints in `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  apiVersion: 'v1'
};
```

### Available Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token

#### Restaurants
- `GET /restaurants` - Get all restaurants (paginated)
- `GET /restaurants/:id` - Get restaurant details
- `GET /restaurants/search` - Search restaurants
- `GET /restaurants/nearby` - Get nearby restaurants

#### Cart
- `GET /cart` - Get current cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove item from cart
- `DELETE /cart/clear` - Clear entire cart

#### Orders
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create new order
- `PATCH /orders/:id/status` - Update order status
- `POST /orders/:id/cancel` - Cancel order
- `GET /orders/:id/track` - Track order

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 19+

### Installation

```bash
# Navigate to project directory
cd food-app-angular

# Install dependencies (already done)
npm install

# Start development server
npm start
# or
ng serve

# Application will be available at http://localhost:4200
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
ng build
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Unit tests
ng test

# End-to-end tests (if configured)
ng e2e
```

## Project Configuration

### Environment Variables
- **Development** (`environment.ts`): API URL points to localhost
- **Production** (`environment.prod.ts`): API URL points to production server

### TypeScript Path Aliases
For easier imports:
```typescript
// Instead of
import { AuthService } from '../../../core/services';

// Use
import { AuthService } from '@core/services';
```

Available aliases:
- `@core/*` - Core module
- `@shared/*` - Shared module
- `@features/*` - Feature modules
- `@layouts/*` - Layouts
- `@env/*` - Environment files
- `@assets/*` - Assets

## Best Practices Implemented

1. **Folder Structure**: Feature-based organization
2. **Lazy Loading**: Feature modules loaded on demand
3. **Type Safety**: Strict TypeScript configuration
4. **Reactive Programming**: RxJS Observables for async operations
5. **HTTP Interceptors**: Centralized request/response handling
6. **Error Handling**: Global error interceptor with user feedback
7. **Services**: Single responsibility principle
8. **Components**: Smart (container) and presentational (dumb) pattern
9. **Dependency Injection**: Leveraging Angular's DI system
10. **Reusable Code**: Shared components and pipes

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Best Practices Guide](https://angular.dev/guide/styleguide)

## Contributing

Follow these guidelines when contributing:
1. Maintain the existing folder structure
2. Use consistent naming conventions
3. Add TypeScript types for all functions
4. Create reusable components and services
5. Document complex logic with comments
6. Keep components focused on single responsibility

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please contact the development team.

---

**Project Suffix**: `fa` (Food App)  
**Version**: 1.0.0  
**Last Updated**: March 2026

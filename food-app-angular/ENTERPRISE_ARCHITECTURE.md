# FoodDelivery App - Enterprise Architecture Guide

## Project Overview

This is an enterprise-level food delivery application built with Angular 21, featuring:
- **State Management**: NgRx for predictable state management
- **Service Architecture**: Layered services with async operations
- **Authentication**: JWT-based with token refresh
- **Real-time Features**: WebSocket notifications
- **Performance**: Lazy loading, caching, and optimization
- **Scalability**: Module-based architecture ready for feature expansion

## Directory Structure

```
src/app/
├── core/
│   ├── guards/              # Route guards (auth, role-based)
│   ├── interceptors/        # HTTP interceptors (auth, error, token)
│   ├── models/              # TypeScript interfaces/types
│   ├── services/            # Core services (auth, API, business logic)
│   ├── store/               # NgRx store (auth, restaurants, cart, orders)
│   └── utils/               # Utilities (cache, analytics, logging)
├── shared/
│   ├── components/          # Reusable components (header, footer)
│   ├── directives/          # Custom directives
│   └── pipes/               # Custom pipes (currency, time-ago, etc.)
├── features/
│   ├── home/                # Home page feature
│   ├── restaurants/         # Restaurant browsing & detail
│   ├── cart/                # Shopping cart
│   ├── orders/              # Order history & tracking
│   ├── user/                # User auth pages
│   └── [more features]      # Additional feature modules
├── layouts/                 # Layout wrappers
└── app.config.ts            # App configuration & providers
```

## State Management with NgRx

### Store Modules

1. **Auth Store** - User authentication and profile
   - Actions: login, register, logout, refreshToken
   - Selectors: currentUser, isAuthenticated, authError
   
2. **Restaurants Store** - Restaurant data
   - Actions: loadRestaurants, loadRestaurantDetail, searchRestaurants
   - Selectors: allRestaurants, selectedRestaurant, filteredRestaurants
   
3. **Cart Store** - Shopping cart state
   - Actions: addItemToCart, removeItem, applyCoupon
   - Selectors: cartItems, cartTotal, cartItemCount
   
4. **Orders Store** - Order management
   - Actions: createOrder, loadOrders, trackOrder
   - Selectors: allOrders, pendingOrders, orderDetail

### Using Store in Components

```typescript
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsAuthenticated } from '@core/store/auth/auth.selectors';

export class MyComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  
  constructor(private store: Store) {}
  
  login() {
    this.store.dispatch(login({ email, password }));
  }
}
```

## Services Architecture

### Core Services

- **AuthService**: Authentication, login, register, token management
- **RestaurantService**: Restaurant data, search, filtering
- **CartService**: Cart operations and state
- **OrderService**: Order creation, history, tracking
- **PaymentService**: Payment processing and history
- **ReviewService**: Restaurant and food reviews
- **PromotionService**: Coupon validation and application
- **NotificationService**: Real-time notifications via WebSocket
- **UserPreferenceService**: User settings and favorites

### Service Example

```typescript
constructor(private reviewService: ReviewService) {}

onSubmitReview() {
  this.reviewService.createReview(review).subscribe(
    (result) => console.log('Review created', result),
    (error) => console.error('Failed', error)
  );
}
```

## Security Features

1. **JWT Authentication**
   - Token stored in localStorage
   - Automatic token refresh
   - Token expiry handling

2. **HTTP Interceptors**
   - AuthInterceptor: Auto-adds token to requests
   - TokenInterceptor: Handles token refresh
   - AdvancedErrorInterceptor: Centralized error handling
   - Request timeout and retry logic

3. **Route Guards**
   - AuthGuard: Protects authenticated routes
   - RoleGuard: Role-based access control

## Interceptors

### Token Interceptor
- Automatically injects JWT tokens
- Handles 401 refresh token flow
- Prevents duplicate refresh requests

### Error Interceptor
- Centralized error handling
- HTTP error logging
- User-friendly error messages
- Retry logic for failed requests

### Advanced Features
- Request timeout (30s)
- Automatic retry on failure
- Comprehensive error logging

## Performance Optimization

1. **Lazy Loading**
   - Feature modules loaded on demand
   - Route-based code splitting

2. **Caching**
   - CacheService with TTL support
   - Automatic cache invalidation
   - Pattern-based cache clearing

3. **Image Optimization**
   - LazyLoadDirective for lazy image loading
   - Intersection Observer API

4. **Change Detection**
   - Zoneless change detection enabled
   - OnPush strategy in components

## Pipes & Directives

### Pipes
- `currencyFormat`: Format numbers as currency
- `timeAgo`: Convert dates to relative time
- `deliveryTime`: Format delivery time
- `truncate`: Truncate strings with ellipsis
- `formatAddress`: Format address objects
- `formatPhone`: Format phone numbers
- `ratingClass`: CSS class based on rating

### Directives
- `appLazyLoad`: Lazy load images
- `appHighlight`: Highlight elements
- `appAutoFocus`: Auto-focus on input
- `appLoadingSpinner`: Show loading state

## API Integration

All API endpoints are configured in:
- `environment.ts` (development)
- `environment.prod.ts` (production)

Base URL: `http://localhost:3000/api` (dev) / production URL (prod)

### API Endpoints Structure

```
/auth
  POST /login
  POST /register
  POST /refresh
  POST /logout

/restaurants
  GET / (list all)
  GET /:id (detail)
  GET /search?q=query
  POST /filter

/cart
  GET /
  POST /add
  DELETE /:itemId
  PUT /:itemId/quantity

/orders
  GET / (user's orders)
  POST / (create)
  GET /:id (detail)
  PUT /:id/cancel
  GET /:id/track

/reviews
  GET /restaurant/:id
  POST /
  PUT /:id
  DELETE /:id

/payments
  POST /initiate
  POST /verify
  GET /methods

/promotions
  GET /active
  POST /validate
  POST /apply
```

## Analytics & Logging

### Error Logging
- ErrorLogger tracks HTTP errors
- Sends critical errors to backend
- Downloadable error logs

### Analytics
- Event tracking (searches, views, checkouts)
- Session management
- User behavior analysis

### Usage Example

```typescript
constructor(private analytics: AnalyticsService) {
  this.analytics.trackPageView('home');
  this.analytics.trackSearch(query, resultCount);
  this.analytics.trackOrderPlaced(orderId, total);
}
```

## Testing Strategy

### Unit Tests
- Service tests with MockBackend
- Component tests with fixture debugging
- Pipe tests

### E2E Tests
- User journey testing
- Critical path coverage
- Form submission tests

Run tests: `npm test`

## Build & Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

Build output: `dist/food-app-angular/`

### Bundle Analysis
- Max warning limit: 1.5 MB
- Max error limit: 2 MB
- Current: ~1.17 MB

## Multi-language Support (i18n)

Translation system ready with @ngx-translate:
- Language switcher in settings
- Support for multiple languages
- Translation files in `src/assets/i18n/`

## PWA Features

Progressive Web App ready:
- Service worker support
- Offline capability
- App install prompts
- Push notifications

## Environment Configuration

Update API endpoints in environment files:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000'
};
```

## Common Patterns

### Using Observables in Templates
```html
<div *ngIf="(isLoading$ | async)">Loading...</div>
{{ (cartTotal$ | async) | currencyFormat }}
```

### Dispatching Actions
```typescript
onAddToCart(item: FoodItem) {
  this.store.dispatch(addItemToCart({ item }));
}
```

### Selecting State
```typescript
items$ = this.store.select(selectCartItems);
total$ = this.store.select(selectCartTotal);
```

## Constants

Common constants are in `src/app/core/constants/`:
- HTTP status codes
- Error messages
- Validation rules
- API endpoints

## Development Best Practices

1. Use async pipe instead of manual subscription
2. Always unsubscribe from observables (or use async pipe)
3. Use ChangeDetectionStrategy.OnPush where possible
4. Keep components focused and testable
5. Use store for shared state
6. Leverage interceptors for cross-cutting concerns
7. Use typed actions in NgRx

## Troubleshooting

### Common Issues

1. **Token not sent with requests**
   - Check AuthInterceptor is registered in app.config.ts
   - Verify token exists in localStorage

2. **Circular dependency errors**
   - Use index.ts barrel exports
   - Avoid importing from parent folders

3. **State not updating**
   - Dispatch action via store.dispatch()
   - Verify reducer handles the action
   - Check action types match

## Additional Resources

- [Angular Documentation](https://angular.io)
- [NgRx Documentation](https://ngrx.io)
- [Material Design](https://material.io)
- [RxJS Documentation](https://rxjs.dev)

## Support & Contribution

For issues, questions, or contributions, contact the development team.

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready

# Development Guide - Food App Angular

## Quick Start

### 1. Start the Development Server

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### 2. Build for Production

```bash
npm run build
# or
ng build --configuration production
```

## Project Summary

### What Was Set Up

This is an **Enterprise-Level Angular Application** with the following components:

#### ✅ **Core Infrastructure**
- ✓ Zoneless change detection (no zone.js overhead)
- ✓ Strict TypeScript configuration
- ✓ Global error handling with interceptors
- ✓ JWT authentication system
- ✓ Environment-based configuration
- ✓ Path aliases for cleaner imports (@core, @shared, @features, @env)

#### ✅ **Core Module** (`src/app/core/`)
- **Models**: 7 TypeScript interfaces (User, Restaurant, FoodItem, Order, Cart, ApiResponse, PaginatedResponse)
- **Services**: 6 core services
  - `AuthService` - User authentication & token management
  - `RestaurantService` - Restaurant data operations
  - `CartService` - Shopping cart management
  - `OrderService` - Order operations
  - `LoadingService` - Global loading state
  - `ToastService` - Notification system
- **Guards**: 2 security guards
  - `AuthGuard` - Protect authenticated routes
  - `RoleGuard` - Role-based access control
- **Interceptors**: 2 HTTP interceptors
  - `AuthInterceptor` - JWT token injection & token refresh
  - `ErrorInterceptor` - Centralized error handling
- **Constants**: App-wide configuration & constants

#### ✅ **Shared Module** (`src/app/shared/`)
- **Components** (4 reusable)
  - `NavbarComponent` - Top navigation
  - `FooterComponent` - Footer section
  - `LoadingSpinnerComponent` - Overlay spinner
  - `ToastComponent` - Notification display
- **Pipes** (2 custom)
  - `CurrencyFormatPipe` - Format currency values
  - `SafePipe` - Sanitize HTML strings

#### ✅ **Feature Modules** (Lazy-loaded)
1. **Home** - Landing page with featured restaurants
2. **Restaurants** - Restaurant listing & detail view
3. **Cart** - Shopping cart management
4. **Orders** - Order history & tracking
5. **User** - Authentication (Login/Register)
6. **Search** - Advanced search (placeholder)

#### ✅ **Styling & Theme**
- SCSS-based styling
- Global styles with utility classes
- Material color scheme (red #f44336 primary)
- Responsive design ready
- Custom scrollbar styling

#### ✅ **Environment Configuration**
- Development environment (localhost)
- Production environment (production URL)
- Easy API endpoint switching

## File Structure

```
src/app/
├── core/
│   ├── constants/
│   │   ├── app.constants.ts      # All app constants
│   │   └── index.ts
│   ├── guards/
│   │   ├── auth.guard.ts         # Authentication guard
│   │   ├── role.guard.ts         # Role-based guard
│   │   └── index.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts   # JWT token handling
│   │   ├── error.interceptor.ts  # Error handling
│   │   └── index.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── restaurant.model.ts
│   │   ├── food-item.model.ts
│   │   ├── cart.model.ts
│   │   ├── order.model.ts
│   │   ├── api-response.model.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── restaurant.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── loading.service.ts
│   │   ├── toast.service.ts
│   │   └── index.ts
│   └── index.ts
├── shared/
│   ├── components/
│   │   ├── navbar.component.ts
│   │   ├── footer.component.ts
│   │   ├── loading-spinner.component.ts
│   │   ├── toast.component.ts
│   │   └── index.ts
│   ├── pipes/
│   │   ├── currency-format.pipe.ts
│   │   ├── safe.pipe.ts
│   │   └── index.ts
│   └── index.ts
├── features/
│   ├── home/
│   │   ├── home.component.ts
│   │   └── index.ts
│   ├── restaurants/
│   │   ├── restaurant-detail.component.ts
│   │   └── index.ts
│   ├── cart/
│   │   ├── cart.component.ts
│   │   └── index.ts
│   ├── orders/
│   │   ├── orders.component.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── auth.module.ts
│   │   ├── login.component.ts
│   │   ├── register.component.ts
│   │   └── index.ts
│   └── search/
├── layouts/
├── app.routes.ts          # App routing configuration
├── app.config.ts          # App setup & interceptors
├── app.html               # Root template
├── app.ts                 # Root component
└── app.scss               # Component-level styles

src/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
├── styles.scss            # Global styles
└── main.ts                # Application entry point
```

## Available Commands

```bash
# Development
npm start                    # Start dev server
npm run dev                  # Alternative dev start

# Building
npm run build               # Build for production
npm run build:prod          # Explicit production build

# Testing
npm test                    # Run unit tests
npm run e2e                 # Run end-to-end tests

# Other
npm run lint                # Run linter
npm run format              # Format code (if configured)
```

## API Integration

The application expects a backend API with the following base URL:
- Development: `http://localhost:3000/api`
- Production: `https://api.foodapp.com/api`

Update these in `src/environments/environment.ts` and `environment.prod.ts`

### Required API Endpoints

See `PROJECT_SETUP.md` for complete API endpoint documentation.

## Authentication Flow

1. User registers or logs in via `/auth/login` or `/auth/register`
2. Backend returns JWT token and user data
3. Token is stored in `localStorage`
4. `AuthInterceptor` automatically adds token to all API requests
5. On token expiration, `refreshToken()` endpoint is called
6. If refresh fails, user is logged out

## State Management Pattern

This project uses **RxJS Observables** for state management:

```typescript
// Service example
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  addItemToCart(item: any) {
    // Update state
    this.cartSubject.next(updatedCart);
  }
}

// Component example
export class CartComponent implements OnInit {
  cart$: Observable<Cart | null>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }

  // In template
  // <div *ngIf="cart$ | async as cart">
}
```

## Styling & Theme Customization

Primary colors used:
- Red (Primary): `#f44336`
- Dark Red (Hover): `#da190b`
- Background: `#f5f5f5`
- Text: `#333`
- Muted: `#666`

To change theme, update colors in:
1. `src/styles.scss` - Global styles
2. Component-level SCSS files

## Performance Tips

1. **Lazy Loading**: Feature modules are lazy-loaded by default
2. **OnPush Detection**: Use ChangeDetectionStrategy.OnPush in components
3. **Unsubscribe**: Use `async` pipe or unsubscribe in `ngOnDestroy`
4. **TrackBy**: Use trackBy in `*ngFor` loops
5. **Code Splitting**: Each feature module is a separate bundle

## Debugging

### Enable Detailed Logging
Update `src/environments/environment.ts`:
```typescript
export const environment = {
  logLevel: 'debug',
  // ... other config
};
```

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Storage > Local Storage
3. View stored auth token and cart data
4. Use Network tab to inspect API calls

### Angular DevTools Extension
- Install Angular DevTools extension
- View component tree
- Inspect service state
- Check change detection

## Common Issues & Solutions

### Issue: CORS errors
**Solution**: Configure backend CORS or use a proxy in `angular.json`

### Issue: Token not being sent
**Solution**: Check `AuthInterceptor` is registered in `app.config.ts`

### Issue: Routes not loading
**Solution**: Verify routes are correctly configured in `app.routes.ts`

### Issue: Type errors
**Solution**: Ensure strict TypeScript is enabled; check `tsconfig.json`

## Next Steps

1. **Connect Backend API**
   - Update environment URLs
   - Test API endpoints

2. **Add More Features**
   - User profile management
   - Payment integration
   - Order tracking with Maps

3. **Enhance UI/UX**
   - Add more animations
   - Implement PWA features
   - Mobile optimization

4. **Add State Management** (optional)
   - NgRx for complex state
   - Keep current Observable pattern if simple

5. **Unit Testing**
   - Write tests for services
   - Test components with TestBed
   - Aim for 80%+ coverage

## Project Suffix

All resources should use suffix: **`fa`** (Food App)
- Icons: `fa-icon.svg`
- Components: `*.fa.component.ts`
- Modules: `*.fa.module.ts`

## Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Best Practices](https://angular.dev/guide/styleguide)

## Support & Contact

For issues or questions about this setup, refer to:
1. Angular docs and tutorials
2. TypeScript documentation
3. Community forums

---

**Happy Coding! 🚀**

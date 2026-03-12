# Testing Strategy & Guide

## Overview

This document outlines the comprehensive testing strategy for the FoodDelivery Angular application, including unit tests, integration tests, and E2E tests.

## Testing Types

### 1. Unit Tests
- Test individual services, pipes, directives
- Use Jasmine framework with Karma test runner
- Target: 80%+ code coverage

### 2. Integration Tests
- Test components with services
- Test NgRx store interactions
- Test HTTP interceptors

### 3. E2E Tests
- End-to-end user journeys
- Use Cypress or Protractor
- Test critical user paths

## Setup

### Run Tests
```bash
npm test                          # Watch mode
npm test -- --watch=false        # Single run
npm test -- --code-coverage      # With coverage
```

### Coverage Report
```bash
npm test -- --code-coverage
# Report in: coverage/index.html
```

## Unit Testing Examples

### Service Test

```typescript
// src/app/core/services/cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { environment } from '@env/environment';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add item to cart', () => {
    const mockItem = {
      id: '1',
      name: 'Pizza',
      price: 10,
      quantity: 1
    };

    const spy = jasmine.createSpy();
    service.addToCart(mockItem).subscribe(spy);

    const req = httpMock.expectOne(`${environment.apiUrl}/cart/add`);
    expect(req.request.method).toBe('POST');
    req.flush(mockItem);

    expect(spy).toHaveBeenCalled();
  });

  it('should remove item from cart', () => {
    service.removeFromCart('1').subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/cart/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
```

### Component Test

```typescript
// src/app/features/cart/cart.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '@core/services';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', ['getCart', 'removeItem']);

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: spy }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should load cart on init', () => {
    const mockCart = { items: [], total: 0 };
    cartService.getCart.and.returnValue(of(mockCart));

    fixture.detectChanges();

    expect(cartService.getCart).toHaveBeenCalled();
  });

  it('should remove item from cart', () => {
    component.removeFromCart('item-1');
    expect(cartService.removeItem).toHaveBeenCalledWith('item-1');
  });

  it('should display cart total', () => {
    component.cart = {
      items: [],
      subtotal: 100,
      tax: 10,
      total: 110
    };
    fixture.detectChanges();

    const totalElement = fixture.nativeElement.querySelector('.cart-total');
    expect(totalElement.textContent).toContain('110');
  });
});
```

### Pipe Test

```typescript
// src/app/shared/pipes/currency-format.pipe.spec.ts
import { CurrencyFormatPipe } from './enterprise.pipes';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should format currency with Indian Rupee symbol', () => {
    expect(pipe.transform(100, 'INR')).toBe('₹100.00');
  });

  it('should format currency with USD symbol', () => {
    expect(pipe.transform(100, 'USD')).toBe('$100.00');
  });

  it('should handle null value', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
```

### Directive Test

```typescript
// src/app/shared/directives/lazy-load.directive.spec.ts
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyLoadDirective } from './enterprise.directives';
import { By } from '@angular/platform-browser';

@Component({
  template: `<img [appLazyLoad]="'test.jpg'" />`
})
class TestComponent {}

describe('LazyLoadDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let imgElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [LazyLoadDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    imgElement = fixture.debugElement.query(By.directive(LazyLoadDirective));
  });

  it('should have lazy-loading class initially', () => {
    fixture.detectChanges();
    expect(imgElement.nativeElement.classList.contains('lazy-loading')).toBe(true);
  });
});
```

## NGRx Store Testing

### Reducer Test

```typescript
// src/app/core/store/auth/auth.reducer.spec.ts
import { authReducer, initialAuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { User } from '@core/models';

describe('Auth Reducer', () => {
  const mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    addresses: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('should set user on login success', () => {
    const action = AuthActions.loginSuccess({
      response: { token: 'token', user: mockUser }
    });
    const state = authReducer(initialAuthState, action);

    expect(state.currentUser).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('token');
  });

  it('should clear state on logout', () => {
    const initialStateWithUser = {
      ...initialAuthState,
      currentUser: mockUser,
      isAuthenticated: true,
      token: 'token'
    };

    const action = AuthActions.logout();
    const state = authReducer(initialStateWithUser, action);

    expect(state.currentUser).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
  });
});
```

### Selector Test

```typescript
// src/app/core/store/auth/auth.selectors.spec.ts
import { selectCurrentUser, selectIsAuthenticated } from './auth.selectors';
import { AuthState } from './auth.reducer';
import { User } from '@core/models';

describe('Auth Selectors', () => {
  const mockUser: User = { /* ... */ };
  const mockState: AuthState = {
    currentUser: mockUser,
    token: 'token',
    isAuthenticated: true,
    isLoading: false,
    error: null
  };

  it('should select current user', () => {
    const result = selectCurrentUser({ auth: mockState });
    expect(result).toEqual(mockUser);
  });

  it('should select authentication status', () => {
    const result = selectIsAuthenticated({ auth: mockState });
    expect(result).toBe(true);
  });
});
```

## Integration Tests

### API Integration Test

```typescript
describe('Cart Service Integration', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService, AuthService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should handle cart operations', () => {
    // Add item
    const item = { id: '1', name: 'Pizza', price: 10 };
    service.addToCart(item).subscribe();
    
    let req = httpMock.expectOne(request => request.url.includes('/cart/add'));
    req.flush({ success: true });

    // Remove item
    service.removeFromCart('1').subscribe();
    
    req = httpMock.expectOne(request => request.url.includes('/cart/1'));
    req.flush({ success: true });

    httpMock.verify();
  });
});
```

## E2E Testing with Cypress

### Cypress Test Example

```typescript
// cypress/e2e/cart.cy.ts
describe('Cart Feature', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password');
    cy.visit('/');
  });

  it('should add item to cart', () => {
    cy.contains('Browse Restaurants').click();
    cy.get('[data-cy=restaurant-card]').first().click();
    cy.get('[data-cy=add-to-cart]').first().click();
    cy.get('[data-cy=cart-badge]').should('contain', '1');
  });

  it('should checkout successfully', () => {
    cy.addToCart('Pizza', 1);
    cy.visit('/cart');
    cy.contains('Checkout').click();
    cy.fill(FormData);
    cy.contains('Place Order').click();
    cy.should('contain', 'Order Confirmed');
  });

  it('should apply coupon', () => {
    cy.addToCart('Pizza', 1);
    cy.visit('/cart');
    cy.get('[data-cy=coupon-input]').type('SAVE20');
    cy.get('[data-cy=apply-coupon]').click();
    cy.should('contain', 'Coupon Applied');
  });
});
```

### Custom Cypress Commands

```typescript
// cypress/support/commands.ts
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth/login');
  cy.get('[data-cy=email]').type(email);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=login-btn]').click();
  cy.url().should('include', '/');
});

Cypress.Commands.add('addToCart', (itemName: string, quantity: number) => {
  cy.visit('/');
  cy.contains('Restaurant').click();
  cy.contains(itemName).click();
  cy.get('[data-cy=quantity]').type(quantity);
  cy.get('[data-cy=add-btn]').click();
});
```

## Test Coverage Targets

| Category | Target | Current |
|----------|--------|---------|
| Statements | 80% | - |
| Branches | 75% | - |
| Functions | 80% | - |
| Lines | 80% | - |

## Testing Best Practices

1. **Use descriptive test names**
   ```typescript
   it('should display error message when login fails', () => {});
   ```

2. **Arrange-Act-Assert Pattern**
   ```typescript
   // Arrange
   const mockData = { test: 'data' };
   
   // Act
   const result = service.method(mockData);
   
   // Assert
   expect(result).toEqual(expected);
   ```

3. **Mock External Dependencies**
   ```typescript
   const mockService = jasmine.createSpyObj('Service', ['method']);
   ```

4. **Test Edge Cases**
   ```typescript
   it('should handle null values', () => {});
   it('should handle empty arrays', () => {});
   ```

5. **Use Data-Driven Tests**
   ```typescript
   [10, 20, 30].forEach(value => {
     it(`should handle value ${value}`, () => {
       expect(service.calculate(value)).toBeDefined();
     });
   });
   ```

## Continuous Integration

### GitHub Actions Test Workflow

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --code-coverage --watch=false
      - run: npm run e2e
```

## Debugging Tests

### Debug Single Test
```bash
npm test -- --include='**/service.spec.ts'
```

### Chrome Debugger
```bash
ng test --browsers=Chrome
# Then open DevTools (F12)
```

### VS Code Debug
Add to `.vscode/launch.json`:
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Karma",
  "url": "http://localhost:9876/debug.html",
  "webRoot": "${workspaceRoot}"
}
```

---

**Last Updated**: 2024
**Coverage Target**: 80%+
**Status**: Ready for Testing

# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd food-app-angular
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open Browser
Navigate to `http://localhost:4200`

## Project Structure Quick Reference

```
src/app/
├── core/              # Auth, store, services
├── shared/            # Pipes, directives, components  
├── features/          # Feature modules
└── app.routes.ts      # Route configuration
```

## Key Commands

```bash
# Development
npm start                 # Start dev server
npm test                  # Run unit tests
npm run build            # Production build

# Code quality
npm run lint             # Check code style
npm run format           # Format code

# Deployment
npm run build -- --configuration production
```

## Default Credentials (Development)

```
Email: demo@example.com
Password: demo123
```

## Common Tasks

### Adding a New Feature

1. Generate component:
   ```bash
   ng generate component features/feature-name
   ```

2. Add route in `app.routes.ts`

3. Create service in `core/services/`

4. Add NgRx store if needed

### Creating New Service

```typescript
// src/app/core/services/my.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor(private http: HttpClient) {}
  
  getData() {
    return this.http.get(`${environment.apiUrl}/endpoint`);
  }
}
```

### Using Store

```typescript
import { Store } from '@ngrx/store';
import { selectCartItems } from '@core/store/cart/cart.selectors';

export class MyComponent {
  items$ = this.store.select(selectCartItems);
  
  constructor(private store: Store) {}
}
```

### Formatting Code

```html
<!-- Use async pipe -->
{{ (data$ | async) | currencyFormat }}

<!-- Track items in loops -->
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

## Environment Setup

### Development (Default)
```bash
npm start
# API: http://localhost:3000/api
```

### Production Build
```bash
npm run build -- --configuration production
# Creates optimized bundle in dist/
```

### Custom Environment
1. Create `environment.custom.ts`
2. Update `angular.json` with new configuration
3. Run `ng serve --configuration custom`

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test -- --include='**/cart.service.spec.ts'
```

### Coverage Report
```bash
npm test -- --code-coverage
```

## Debugging

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Set breakpoints in code
4. Use NgRx DevTools extension

### NgRx Store DevTools
- Redux DevTools Chrome extension
- Time-travel debugging
- Action replay

## Common Issues & Solutions

### Port 4200 Already in Use
```bash
# Use different port
ng serve --port 4300
```

### Node Modules Corrupt
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Clear cache
rm -rf .angular
npm run build
```

### Tests Failing
```bash
# Clear test cache
npm test -- --no-cache
```

## API Configuration

Update API URL in environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000'
};
```

## Adding Dependencies

```bash
# Install new package
npm install package-name

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Code Quality

### ESLint
```bash
npm run lint
npm run lint -- --fix  # Auto-fix issues
```

### Prettier
```bash
npx prettier --write src/**/*.ts
```

## Useful Extensions

Recommended VS Code extensions:
- Angular Language Service
- Material Icon Theme
- NgRx Store DevTools
- Prettier - Code formatter
- ESLint
- Thunder Client / REST Client

## Performance Tips

1. Always use async pipe in templates
2. Implement OnPush change detection
3. Lazy load feature modules
4. Unsubscribe from observables
5. Use trackBy in *ngFor
6. Cache API responses

## Keyboard Shortcuts

| Command | Shortcut |
|---------|----------|
| Format Code | Alt+Shift+F |
| Go to Definition | F12 |
| Find References | Shift+F12 |
| Go to Line | Ctrl+G |
| Go to File | Ctrl+P |
| Terminal | Ctrl+` |

## Best Practices

✅ DO:
- Use async pipe with observables
- Implement error handling
- Write unit tests
- Use TypeScript strict mode
- Document complex logic

❌ DON'T:
- Subscribe without unsubscribing
- Use `any` type
- Mix RxJS and promises
- Hardcode values
- Skip error handling

## Getting Help

- Check `ENTERPRISE_ARCHITECTURE.md` for detailed docs
- Review `API_INTEGRATION_GUIDE.md` for API details
- Check `DEPLOYMENT_GUIDE.md` for deployment info
- Browse existing components for examples

## Next Steps

1. ✅ Local development working?
2. ⬜ Create first feature
3. ⬜ Connect to backend API
4. ⬜ Add authentication
5. ⬜ Write tests
6. ⬜ Deploy to staging
7. ⬜ Deploy to production

---

**Last Updated**: 2024
**Status**: Ready for Development

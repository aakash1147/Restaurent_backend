import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { routes } from './app.routes';
import { AuthInterceptor, ErrorInterceptor } from './core/interceptors';
import { authReducer, AuthEffects } from './core/store/auth';
import { restaurantsReducer, RestaurantEffects } from './core/store/restaurants';
import { cartReducer } from './core/store/cart';
import { ordersReducer } from './core/store/orders';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    
    // NgRx Store Configuration
    provideStore({
      auth: authReducer,
      restaurants: restaurantsReducer,
      cart: cartReducer,
      orders: ordersReducer
    }),
    provideEffects([AuthEffects, RestaurantEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};

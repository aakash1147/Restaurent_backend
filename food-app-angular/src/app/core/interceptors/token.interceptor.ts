import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private injector: Injector,
    private toastService: ToastService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();

    if (token && !this.isTokenExpired(token)) {
      req = this.addTokenToRequest(req, token);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addTokenToRequest(req, response.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          authService.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenToRequest(req, token)))
      );
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp - 60000; // Refresh 1 minute before expiry
    } catch (e) {
      return false;
    }
  }
}

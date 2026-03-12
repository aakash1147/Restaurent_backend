import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { ErrorLogger } from '../utils/error-logger';

@Injectable()
export class AdvancedErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastService,
    private errorLogger: ErrorLogger
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(30000), // 30 second timeout
      retry({ count: 1, delay: 1000 }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    
    this.errorLogger.logError({
      status: error.status,
      message: errorMessage,
      url: error.url,
      timestamp: new Date(),
      details: error.error
    });

    switch (error.status) {
      case 400:
        this.toastService.error('Bad Request: ' + errorMessage);
        break;
      case 401:
        this.toastService.error('Unauthorized. Please login again.');
        break;
      case 403:
        this.toastService.error('Forbidden. You do not have permission.');
        break;
      case 404:
        this.toastService.error('Resource not found.');
        break;
      case 422:
        this.toastService.error('Validation Error: ' + this.getValidationErrors(error));
        break;
      case 429:
        this.toastService.warning('Too many requests. Please try again later.');
        break;
      case 500:
        this.toastService.error('Server Error. Please try again later.');
        break;
      case 503:
        this.toastService.error('Service unavailable. Please try again later.');
        break;
      default:
        if (error.status === 0) {
          this.toastService.error('Network error. Please check your connection.');
        } else {
          this.toastService.error('An error occurred: ' + errorMessage);
        }
    }

    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      details: error.error
    }));
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    }
    return error.error?.message || error.message || 'Unknown error occurred';
  }

  private getValidationErrors(error: HttpErrorResponse): string {
    if (error.error?.errors && typeof error.error.errors === 'object') {
      return Object.values(error.error.errors).join(', ');
    }
    return error.error?.message || 'Validation failed';
  }
}

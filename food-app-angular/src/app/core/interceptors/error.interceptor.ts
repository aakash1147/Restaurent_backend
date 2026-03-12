import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService, ToastService } from '../services';
import { ERROR_CODES } from '../constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingService.hideLoading())
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'An error occurred';
    let errorCode = ERROR_CODES.UNKNOWN_ERROR;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
      errorCode = ERROR_CODES.NETWORK_ERROR;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Bad request';
          errorCode = ERROR_CODES.VALIDATION_ERROR;
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          errorCode = ERROR_CODES.UNAUTHORIZED;
          break;
        case 403:
          errorMessage = 'Access forbidden';
          errorCode = ERROR_CODES.FORBIDDEN;
          break;
        case 404:
          errorMessage = 'Resource not found';
          errorCode = ERROR_CODES.NOT_FOUND;
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'Server error. Please try again later.';
          errorCode = ERROR_CODES.SERVER_ERROR;
          break;
        default:
          errorMessage = error.error?.message || 'An unexpected error occurred';
      }
    }

    this.toastService.showError(errorMessage);
  }
}

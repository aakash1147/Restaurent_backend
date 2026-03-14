import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.toastService.success('Login successful');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => this.toastService.error(error))
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ data }) =>
        this.authService.register(data).pipe(
          map((response) => AuthActions.registerSuccess({ response })),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.error?.message || 'Registration failed' }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.toastService.success('Registration successful');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => this.toastService.error(error))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.toastService.info('Logged out successfully');
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((response) => AuthActions.refreshTokenSuccess({ response })),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error: error.error?.message || 'Token refresh failed' }))
          )
        )
      )
    )
  );

}

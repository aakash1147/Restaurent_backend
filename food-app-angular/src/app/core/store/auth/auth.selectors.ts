import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { User } from '../../models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user: User | null) => user?.email || null
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (user: User | null) => user ? `${user.firstName} ${user.lastName}` : null
);

export const selectUserAddresses = createSelector(
  selectCurrentUser,
  (user: User | null) => user?.addresses || []
);

export const selectDefaultAddress = createSelector(
  selectUserAddresses,
  (addresses: any[]) => addresses?.find((addr: any) => addr.isDefault) || null
);

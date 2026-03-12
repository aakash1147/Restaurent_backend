import { createReducer, on } from '@ngrx/store';
import { User, AuthResponse } from '../../models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  currentUser: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state: AuthState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state: AuthState, { response }: { response: AuthResponse }) => ({
    ...state,
    currentUser: response.user,
    token: response.token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state: AuthState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Register
  on(AuthActions.register, (state: AuthState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state: AuthState, { response }: { response: AuthResponse }) => ({
    ...state,
    currentUser: response.user,
    token: response.token,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state: AuthState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Logout
  on(AuthActions.logout, (state: AuthState) => ({
    ...state,
    currentUser: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  })),

  // Refresh Token
  on(AuthActions.refreshToken, (state: AuthState) => ({
    ...state,
    isLoading: true
  })),
  on(AuthActions.refreshTokenSuccess, (state: AuthState, { response }: { response: AuthResponse }) => ({
    ...state,
    token: response.token,
    currentUser: response.user,
    isLoading: false,
    error: null
  })),
  on(AuthActions.refreshTokenFailure, (state: AuthState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Load Current User
  on(AuthActions.loadCurrentUser, (state: AuthState) => ({
    ...state,
    isLoading: true
  })),
  on(AuthActions.loadCurrentUserSuccess, (state: AuthState, { user }: { user: User }) => ({
    ...state,
    currentUser: user,
    isLoading: false,
    error: null
  })),
  on(AuthActions.loadCurrentUserFailure, (state: AuthState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Update Profile
  on(AuthActions.updateProfile, (state: AuthState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.updateProfileSuccess, (state: AuthState, { user }: { user: User }) => ({
    ...state,
    currentUser: user,
    isLoading: false,
    error: null
  })),
  on(AuthActions.updateProfileFailure, (state: AuthState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

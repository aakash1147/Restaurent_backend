import { createAction, props } from '@ngrx/store';
import { User, AuthResponse } from '../../models';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register Actions
export const register = createAction(
  '[Auth] Register',
  props<{ data: any }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: AuthResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout Action
export const logout = createAction(
  '[Auth] Logout'
);

// Refresh Token Actions
export const refreshToken = createAction(
  '[Auth] Refresh Token'
);

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ response: AuthResponse }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);

// Load User Actions
export const loadCurrentUser = createAction(
  '[Auth] Load Current User'
);

export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>()
);

export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>()
);

// Update Profile Actions
export const updateProfile = createAction(
  '[Auth] Update Profile',
  props<{ user: Partial<User> }>()
);

export const updateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: User }>()
);

export const updateProfileFailure = createAction(
  '[Auth] Update Profile Failure',
  props<{ error: string }>()
);

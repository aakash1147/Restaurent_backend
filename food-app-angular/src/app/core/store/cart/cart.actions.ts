import { createAction, props } from '@ngrx/store';
import { Cart, CartItem } from '../../models';

export const addItemToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeItemFromCart = createAction(
  '[Cart] Remove Item',
  props<{ itemId: string }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: string; quantity: number }>()
);

export const applyCoupon = createAction(
  '[Cart] Apply Coupon',
  props<{ code: string }>()
);

export const applyCouponSuccess = createAction(
  '[Cart] Apply Coupon Success',
  props<{ discount: number }>()
);

export const applyCouponFailure = createAction(
  '[Cart] Apply Coupon Failure',
  props<{ error: string }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: Cart }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const syncCartToServer = createAction(
  '[Cart] Sync To Server'
);

export const syncCartToServerSuccess = createAction(
  '[Cart] Sync To Server Success'
);

export const syncCartToServerFailure = createAction(
  '[Cart] Sync To Server Failure',
  props<{ error: string }>()
);

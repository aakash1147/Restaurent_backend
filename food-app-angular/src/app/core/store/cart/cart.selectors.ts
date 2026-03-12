import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartSubtotal = createSelector(
  selectCartState,
  (state: CartState) => state.subtotal
);

export const selectCartTax = createSelector(
  selectCartState,
  (state: CartState) => state.tax
);

export const selectCartDeliveryCharge = createSelector(
  selectCartState,
  (state: CartState) => state.deliveryCharge
);

export const selectCartDiscount = createSelector(
  selectCartState,
  (state: CartState) => state.discountAmount
);

export const selectCartDisountCode = createSelector(
  selectCartState,
  (state: CartState) => state.discountCode
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => state.total
);

export const selectCartIsLoading = createSelector(
  selectCartState,
  (state: CartState) => state.isLoading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartIsEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

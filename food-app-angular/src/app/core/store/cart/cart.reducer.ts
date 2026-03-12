import { createReducer, on } from '@ngrx/store';
import { Cart, CartItem } from '../../models';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  discountAmount: number;
  discountCode: string | null;
  total: number;
  isLoading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  deliveryCharge: 0,
  discountAmount: 0,
  discountCode: null,
  total: 0,
  isLoading: false,
  error: null
};

const calculateTotals = (items: CartItem[], discount: number = 0, deliveryCharge: number = 40): CartState => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + tax + deliveryCharge - discount;
  
  return {
    items,
    subtotal,
    tax,
    deliveryCharge,
    discountAmount: discount,
    discountCode: null,
    total,
    isLoading: false,
    error: null
  };
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addItemToCart, (state, { item }) => {
    const existingItem = state.items.find(i => i.id === item.id);
    const updatedItems = existingItem
      ? state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      : [...state.items, item];
    
    return {
      ...calculateTotals(updatedItems, state.discountAmount, state.deliveryCharge),
      discountCode: state.discountCode
    };
  }),

  on(CartActions.removeItemFromCart, (state, { itemId }) => {
    const updatedItems = state.items.filter(i => i.id !== itemId);
    return {
      ...calculateTotals(updatedItems, state.discountAmount, state.deliveryCharge),
      discountCode: state.discountCode
    };
  }),

  on(CartActions.updateCartItemQuantity, (state, { itemId, quantity }) => {
    const updatedItems = state.items.map(i =>
      i.id === itemId ? { ...i, quantity } : i
    ).filter(i => i.quantity > 0);
    
    return {
      ...calculateTotals(updatedItems, state.discountAmount, state.deliveryCharge),
      discountCode: state.discountCode
    };
  }),

  on(CartActions.applyCouponSuccess, (state, { discount }) => {
    const total = state.subtotal + state.tax + state.deliveryCharge - discount;
    return {
      ...state,
      discountAmount: discount,
      total
    };
  }),

  on(CartActions.applyCouponFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(CartActions.clearCart, () => initialCartState),

  on(CartActions.loadCart, (state) => ({
    ...state,
    isLoading: true
  })),

  on(CartActions.loadCartSuccess, (state: CartState, { cart }: { cart: Cart }) => ({
    items: cart.items,
    subtotal: cart.subtotal,
    tax: cart.taxAmount,
    deliveryCharge: cart.deliveryCharge,
    discountAmount: cart.discountAmount,
    discountCode: cart.couponCode || null,
    total: cart.total,
    isLoading: false,
    error: null
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

import { createAction, props } from '@ngrx/store';
import { Order } from '../../models';

export const loadOrders = createAction(
  '[Orders] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>()
);

export const loadOrderDetail = createAction(
  '[Orders] Load Order Detail',
  props<{ id: string }>()
);

export const loadOrderDetailSuccess = createAction(
  '[Orders] Load Order Detail Success',
  props<{ order: Order }>()
);

export const loadOrderDetailFailure = createAction(
  '[Orders] Load Order Detail Failure',
  props<{ error: string }>()
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: Partial<Order> }>()
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>()
);

export const cancelOrder = createAction(
  '[Orders] Cancel Order',
  props<{ id: string }>()
);

export const cancelOrderSuccess = createAction(
  '[Orders] Cancel Order Success',
  props<{ id: string }>()
);

export const cancelOrderFailure = createAction(
  '[Orders] Cancel Order Failure',
  props<{ error: string }>()
);

export const trackOrderStatus = createAction(
  '[Orders] Track Order Status',
  props<{ id: string }>()
);

export const trackOrderStatusSuccess = createAction(
  '[Orders] Track Order Status Success',
  props<{ order: Order }>()
);

export const trackOrderStatusFailure = createAction(
  '[Orders] Track Order Status Failure',
  props<{ error: string }>()
);

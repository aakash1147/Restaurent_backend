import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, selectAllOrders } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrdersList = createSelector(
  selectOrdersState,
  selectAllOrders
);

export const selectSelectedOrderId = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.selectedId
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  selectSelectedOrderId,
  (state, id) => id ? state.entities[id] : null
);

export const selectOrdersLoading = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.isLoading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => state.error
);

export const selectPendingOrders = createSelector(
  selectAllOrdersList,
  (orders) => orders.filter(o => ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(o.status))
);

export const selectDeliveredOrders = createSelector(
  selectAllOrdersList,
  (orders) => orders.filter(o => o.status === 'delivered')
);

export const selectCancelledOrders = createSelector(
  selectAllOrdersList,
  (orders) => orders.filter(o => o.status === 'cancelled')
);

export const selectRecentOrders = createSelector(
  selectAllOrdersList,
  (orders) => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
);

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Order } from '../../models';
import * as OrdersActions from './orders.actions';

export interface OrdersState extends EntityState<Order> {
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id
});

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState({
  selectedId: null,
  isLoading: false,
  error: null
});

export const ordersReducer = createReducer(
  initialOrdersState,

  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, isLoading: false })
  ),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(OrdersActions.loadOrderDetail, (state, { id }) => ({
    ...state,
    selectedId: id,
    isLoading: true,
    error: null
  })),
  on(OrdersActions.loadOrderDetailSuccess, (state, { order }) =>
    ordersAdapter.upsertOne(order, { ...state, isLoading: false })
  ),
  on(OrdersActions.loadOrderDetailFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(OrdersActions.createOrder, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) =>
    ordersAdapter.addOne(order, { ...state, isLoading: false })
  ),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(OrdersActions.cancelOrder, (state) => ({
    ...state,
    isLoading: true
  })),
  on(OrdersActions.cancelOrderSuccess, (state: OrdersState, { id }: { id: string }) =>
    ordersAdapter.updateOne({ id, changes: { status: 'cancelled' as any } }, { ...state, isLoading: false })
  ),
  on(OrdersActions.cancelOrderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(OrdersActions.trackOrderStatus, (state) => ({
    ...state,
    isLoading: true
  })),
  on(OrdersActions.trackOrderStatusSuccess, (state, { order }) =>
    ordersAdapter.upsertOne(order, { ...state, isLoading: false })
  ),
  on(OrdersActions.trackOrderStatusFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export const {
  selectIds: selectOrderIds,
  selectEntities: selectOrderEntities,
  selectAll: selectAllOrders,
  selectTotal: selectOrderTotal
} = ordersAdapter.getSelectors();

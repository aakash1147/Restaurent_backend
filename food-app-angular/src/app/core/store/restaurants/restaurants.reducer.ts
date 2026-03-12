import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Restaurant } from '../../models';
import * as RestaurantActions from './restaurants.actions';

export interface RestaurantsState extends EntityState<Restaurant> {
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
  filters: any;
}

export const adapter: EntityAdapter<Restaurant> = createEntityAdapter<Restaurant>({
  selectId: (restaurant: Restaurant) => restaurant.id
});

export const initialRestaurantsState: RestaurantsState = adapter.getInitialState({
  selectedId: null,
  isLoading: false,
  error: null,
  filters: {}
});

export const restaurantsReducer = createReducer(
  initialRestaurantsState,

  on(RestaurantActions.loadRestaurants, (state: RestaurantsState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(RestaurantActions.loadRestaurantsSuccess, (state: RestaurantsState, { restaurants }: { restaurants: Restaurant[] }) =>
    adapter.setAll(restaurants, { ...state, isLoading: false })
  ),
  on(RestaurantActions.loadRestaurantsFailure, (state: RestaurantsState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(RestaurantActions.loadRestaurantDetail, (state: RestaurantsState, { id }: { id: string }) => ({
    ...state,
    selectedId: id,
    isLoading: true,
    error: null
  })),
  on(RestaurantActions.loadRestaurantDetailSuccess, (state: RestaurantsState, { restaurant }: { restaurant: Restaurant }) =>
    adapter.upsertOne(restaurant, { ...state, isLoading: false })
  ),
  on(RestaurantActions.loadRestaurantDetailFailure, (state: RestaurantsState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(RestaurantActions.searchRestaurants, (state: RestaurantsState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(RestaurantActions.searchRestaurantsSuccess, (state: RestaurantsState, { restaurants }: { restaurants: Restaurant[] }) =>
    adapter.setAll(restaurants, { ...state, isLoading: false })
  ),
  on(RestaurantActions.searchRestaurantsFailure, (state: RestaurantsState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(RestaurantActions.filterRestaurants, (state: RestaurantsState, { filters }: { filters: any }) => ({
    ...state,
    filters,
    isLoading: true,
    error: null
  })),
  on(RestaurantActions.filterRestaurantsSuccess, (state: RestaurantsState, { restaurants }: { restaurants: Restaurant[] }) =>
    adapter.setAll(restaurants, { ...state, isLoading: false })
  ),
  on(RestaurantActions.filterRestaurantsFailure, (state: RestaurantsState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export const {
  selectIds: selectRestaurantIds,
  selectEntities: selectRestaurantEntities,
  selectAll: selectAllRestaurants,
  selectTotal: selectRestaurantTotal
} = adapter.getSelectors();

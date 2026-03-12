import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantsState, selectAllRestaurants } from './restaurants.reducer';

export const selectRestaurantsState = createFeatureSelector<RestaurantsState>('restaurants');

export const selectAllRestaurantsList = createSelector(
  selectRestaurantsState,
  selectAllRestaurants
);

export const selectSelectedRestaurantId = createSelector(
  selectRestaurantsState,
  (state: RestaurantsState) => state.selectedId
);

export const selectSelectedRestaurant = createSelector(
  selectRestaurantsState,
  selectSelectedRestaurantId,
  (state: RestaurantsState, id: string | null) => id ? state.entities[id] : null
);

export const selectRestaurantsLoading = createSelector(
  selectRestaurantsState,
  (state: RestaurantsState) => state.isLoading
);

export const selectRestaurantsError = createSelector(
  selectRestaurantsState,
  (state: RestaurantsState) => state.error
);

export const selectRestaurantFilters = createSelector(
  selectRestaurantsState,
  (state: RestaurantsState) => state.filters
);

export const selectFeaturedRestaurants = createSelector(
  selectAllRestaurantsList,
  (restaurants: any[]) => restaurants.filter((r: any) => r.rating >= 4.5)
);

export const selectRestaurantsByRating = createSelector(
  selectAllRestaurantsList,
  (restaurants: any[]) => [...restaurants].sort((a: any, b: any) => b.rating - a.rating)
);

export const selectRestaurantsByDeliveryTime = createSelector(
  selectAllRestaurantsList,
  (restaurants: any[]) => [...restaurants].sort((a: any, b: any) => a.deliveryTime - b.deliveryTime)
);

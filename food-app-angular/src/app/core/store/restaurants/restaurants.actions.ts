import { createAction, props } from '@ngrx/store';
import { Restaurant, FoodItem } from '../../models';

export const loadRestaurants = createAction(
  '[Restaurants] Load Restaurants'
);

export const loadRestaurantsSuccess = createAction(
  '[Restaurants] Load Restaurants Success',
  props<{ restaurants: Restaurant[] }>()
);

export const loadRestaurantsFailure = createAction(
  '[Restaurants] Load Restaurants Failure',
  props<{ error: string }>()
);

export const loadRestaurantDetail = createAction(
  '[Restaurants] Load Restaurant Detail',
  props<{ id: string }>()
);

export const loadRestaurantDetailSuccess = createAction(
  '[Restaurants] Load Restaurant Detail Success',
  props<{ restaurant: Restaurant }>()
);

export const loadRestaurantDetailFailure = createAction(
  '[Restaurants] Load Restaurant Detail Failure',
  props<{ error: string }>()
);

export const searchRestaurants = createAction(
  '[Restaurants] Search Restaurants',
  props<{ query: string }>()
);

export const searchRestaurantsSuccess = createAction(
  '[Restaurants] Search Restaurants Success',
  props<{ restaurants: Restaurant[] }>()
);

export const searchRestaurantsFailure = createAction(
  '[Restaurants] Search Restaurants Failure',
  props<{ error: string }>()
);

export const filterRestaurants = createAction(
  '[Restaurants] Filter Restaurants',
  props<{ filters: any }>()
);

export const filterRestaurantsSuccess = createAction(
  '[Restaurants] Filter Restaurants Success',
  props<{ restaurants: Restaurant[] }>()
);

export const filterRestaurantsFailure = createAction(
  '[Restaurants] Filter Restaurants Failure',
  props<{ error: string }>()
);

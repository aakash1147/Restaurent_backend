import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RestaurantService } from '../../services/restaurant.service';
import * as RestaurantActions from './restaurants.actions';

@Injectable()
export class RestaurantEffects {
  loadRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.loadRestaurants),
      switchMap(() =>
        this.restaurantService.getRestaurants().pipe(
          map((restaurants: any) => RestaurantActions.loadRestaurantsSuccess({ restaurants })),
          catchError((error: any) =>
            of(RestaurantActions.loadRestaurantsFailure({ error: error.error?.message || 'Failed to load restaurants' }))
          )
        )
      )
    )
  );

  loadRestaurantDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.loadRestaurantDetail),
      switchMap(({ id }: { id: string }) =>
        this.restaurantService.getRestaurantDetail(id).pipe(
          map((restaurant: any) => RestaurantActions.loadRestaurantDetailSuccess({ restaurant })),
          catchError((error: any) =>
            of(RestaurantActions.loadRestaurantDetailFailure({ error: error.error?.message || 'Failed to load restaurant' }))
          )
        )
      )
    )
  );

  searchRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.searchRestaurants),
      switchMap(({ query }: { query: string }) =>
        this.restaurantService.searchRestaurants(query).pipe(
          map((restaurants: any) => RestaurantActions.searchRestaurantsSuccess({ restaurants })),
          catchError((error: any) =>
            of(RestaurantActions.searchRestaurantsFailure({ error: error.error?.message || 'Search failed' }))
          )
        )
      )
    )
  );

  filterRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.filterRestaurants),
      switchMap(({ filters }: { filters: any }) =>
        this.restaurantService.filterRestaurants(filters).pipe(
          map((restaurants: any) => RestaurantActions.filterRestaurantsSuccess({ restaurants })),
          catchError((error: any) =>
            of(RestaurantActions.filterRestaurantsFailure({ error: error.error?.message || 'Filter failed' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private restaurantService: RestaurantService
  ) {}
}

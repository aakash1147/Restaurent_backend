import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Restaurant, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantCacheSubject = new BehaviorSubject<Restaurant[]>([]);
  public restaurants$ = this.restaurantCacheSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllRestaurants(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Restaurant>> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PaginatedResponse<Restaurant>>(
      `${environment.apiUrl}/restaurants`,
      { params }
    ).pipe(
      tap(response => this.restaurantCacheSubject.next(response.data)),
      shareReplay(1)
    );
  }

  getRestaurantById(id: string): Observable<ApiResponse<Restaurant>> {
    return this.http.get<ApiResponse<Restaurant>>(`${environment.apiUrl}/restaurants/${id}`);
  }

  searchRestaurants(query: string, page: number = 1): Observable<PaginatedResponse<Restaurant>> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page);
    return this.http.get<PaginatedResponse<Restaurant>>(
      `${environment.apiUrl}/restaurants/search`,
      { params }
    );
  }

  getNearbyRestaurants(latitude: number, longitude: number, radius: number = 5): Observable<PaginatedResponse<Restaurant>> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('radius', radius);
    return this.http.get<PaginatedResponse<Restaurant>>(
      `${environment.apiUrl}/restaurants/nearby`,
      { params }
    );
  }

  getRestaurantMenu(restaurantId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.apiUrl}/restaurants/${restaurantId}/menu`);
  }
}

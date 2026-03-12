import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Favorite, UserPreference, Analytics } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  constructor(private http: HttpClient) {}

  getUserPreferences(): Observable<UserPreference> {
    return this.http.get<UserPreference>(`${environment.apiUrl}/user/preferences`);
  }

  updateUserPreferences(preferences: Partial<UserPreference>): Observable<UserPreference> {
    return this.http.put<UserPreference>(`${environment.apiUrl}/user/preferences`, preferences);
  }

  addToFavorites(restaurantId: string): Observable<Favorite> {
    return this.http.post<Favorite>(`${environment.apiUrl}/favorites`, { restaurantId });
  }

  removeFromFavorites(restaurantId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/favorites/${restaurantId}`);
  }

  getFavoriteRestaurants(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${environment.apiUrl}/favorites`);
  }

  isFavorited(restaurantId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/favorites/${restaurantId}/check`);
  }

  getUserAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>(`${environment.apiUrl}/user/analytics`);
  }

  updateCuisinePreferences(cuisines: string[]): Observable<UserPreference> {
    return this.updateUserPreferences({ cuisinePreferences: cuisines });
  }

  updateDietaryRestrictions(restrictions: string[]): Observable<UserPreference> {
    return this.updateUserPreferences({ dietaryRestrictions: restrictions });
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): Observable<UserPreference> {
    return this.updateUserPreferences({ theme });
  }

  setLanguage(language: string): Observable<UserPreference> {
    return this.updateUserPreferences({ language });
  }
}

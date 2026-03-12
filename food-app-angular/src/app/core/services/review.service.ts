import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Review, Rating } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews$ = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) {}

  getRestaurantReviews(restaurantId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/restaurant/${restaurantId}`).pipe(
      tap(reviews => this.reviews$.next(reviews))
    );
  }

  getRestaurantRatings(restaurantId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${environment.apiUrl}/reviews/restaurant/${restaurantId}/ratings`);
  }

  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${environment.apiUrl}/reviews`, review);
  }

  updateReview(id: string, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${environment.apiUrl}/reviews/${id}`, review);
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/reviews/${id}`);
  }

  markHelpful(reviewId: string): Observable<Review> {
    return this.http.post<Review>(`${environment.apiUrl}/reviews/${reviewId}/helpful`, {});
  }

  getUserReviews(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/user/${userId}`);
  }

  getAverageRating(restaurantId: string): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/reviews/restaurant/${restaurantId}/average-rating`);
  }
}

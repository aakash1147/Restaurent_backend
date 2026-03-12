import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Promotion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private promotions$ = new BehaviorSubject<Promotion[]>([]);

  constructor(private http: HttpClient) {}

  getActivePromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${environment.apiUrl}/promotions/active`).pipe(
      tap(promotions => this.promotions$.next(promotions))
    );
  }

  validateCoupon(code: string, orderValue: number): Observable<Promotion> {
    return this.http.post<Promotion>(`${environment.apiUrl}/promotions/validate`, {
      code,
      orderValue
    });
  }

  applyCoupon(code: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/promotions/apply`, { code });
  }

  getRestaurantPromotions(restaurantId: string): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${environment.apiUrl}/promotions/restaurant/${restaurantId}`);
  }

  getUserPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${environment.apiUrl}/promotions/user`);
  }

  calculateDiscount(promotion: Promotion, orderValue: number): number {
    if (promotion.discountType === 'percentage') {
      let discount = (promotion.discountValue / 100) * orderValue;
      if (promotion.maxDiscount) {
        discount = Math.min(discount, promotion.maxDiscount);
      }
      return discount;
    }
    return Math.min(promotion.discountValue, orderValue);
  }
}

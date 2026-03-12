import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Cart, CartItem, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  public cartItemsCount$ = this.cartItemsCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeCart();
  }

  private initializeCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
      this.updateItemsCount();
    }
  }

  getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(`${environment.apiUrl}/cart`).pipe(
      tap(response => {
        if (response.data) {
          this.cartSubject.next(response.data);
          this.updateItemsCount();
          this.saveCartToStorage(response.data);
        }
      })
    );
  }

  addItemToCart(restaurantId: string, foodItemId: string, quantity: number, customizations: any[] = []): Observable<ApiResponse<Cart>> {
    const payload = { restaurantId, foodItemId, quantity, customizations };
    return this.http.post<ApiResponse<Cart>>(`${environment.apiUrl}/cart/items`, payload).pipe(
      tap(response => {
        if (response.data) {
          this.cartSubject.next(response.data);
          this.updateItemsCount();
          this.saveCartToStorage(response.data);
        }
      })
    );
  }

  updateCartItem(itemId: string, quantity: number, customizations: any[] = []): Observable<ApiResponse<Cart>> {
    const payload = { quantity, customizations };
    return this.http.put<ApiResponse<Cart>>(`${environment.apiUrl}/cart/items/${itemId}`, payload).pipe(
      tap(response => {
        if (response.data) {
          this.cartSubject.next(response.data);
          this.updateItemsCount();
          this.saveCartToStorage(response.data);
        }
      })
    );
  }

  removeItemFromCart(itemId: string): Observable<ApiResponse<Cart>> {
    return this.http.delete<ApiResponse<Cart>>(`${environment.apiUrl}/cart/items/${itemId}`).pipe(
      tap(response => {
        if (response.data) {
          this.cartSubject.next(response.data);
          this.updateItemsCount();
          this.saveCartToStorage(response.data);
        }
      })
    );
  }

  clearCart(): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${environment.apiUrl}/cart/clear`).pipe(
      tap(() => {
        this.cartSubject.next(null);
        this.cartItemsCountSubject.next(0);
        localStorage.removeItem('cart');
      })
    );
  }

  getCurrentCart(): Cart | null {
    return this.cartSubject.value;
  }

  private updateItemsCount(): void {
    const cart = this.cartSubject.value;
    const count = cart ? cart.totalItems : 0;
    this.cartItemsCountSubject.next(count);
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

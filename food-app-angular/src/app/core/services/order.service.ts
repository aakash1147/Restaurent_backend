import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Order>> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
    return this.http.get<PaginatedResponse<Order>>(
      `${environment.apiUrl}/orders`,
      { params }
    );
  }

  getOrderById(id: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${environment.apiUrl}/orders/${id}`);
  }

  createOrder(orderData: Partial<Order>): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${environment.apiUrl}/orders`, orderData);
  }

  updateOrderStatus(orderId: string, status: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(
      `${environment.apiUrl}/orders/${orderId}/status`,
      { status }
    );
  }

  cancelOrder(orderId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/orders/${orderId}/cancel`, {});
  }

  trackOrder(orderId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.apiUrl}/orders/${orderId}/track`);
  }
}

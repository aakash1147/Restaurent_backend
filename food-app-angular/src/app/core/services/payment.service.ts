import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Payment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  initiatePayment(orderId: string, amount: number, method: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payments/initiate`, {
      orderId,
      amount,
      method
    });
  }

  verifyPayment(paymentId: string, token: string): Observable<Payment> {
    return this.http.post<Payment>(`${environment.apiUrl}/payments/verify`, {
      paymentId,
      token
    });
  }

  getPaymentMethods(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/payments/methods`);
  }

  savePaymentMethod(method: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payments/methods`, method);
  }

  refundPayment(paymentId: string, reason: string): Observable<Payment> {
    return this.http.post<Payment>(`${environment.apiUrl}/payments/${paymentId}/refund`, { reason });
  }

  getPaymentHistory(limit: number = 10): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/payments/history?limit=${limit}`);
  }
}

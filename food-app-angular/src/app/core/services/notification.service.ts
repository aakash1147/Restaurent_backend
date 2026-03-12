import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Notification } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private unreadCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getNotifications(limit: number = 20): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.apiUrl}/notifications?limit=${limit}`).pipe(
      tap(notifications => this.notifications$.next(notifications))
    );
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/notifications/unread-count`).pipe(
      tap(count => this.unreadCount$.next(count))
    );
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.put<Notification>(`${environment.apiUrl}/notifications/${id}/read`, {});
  }

  markAllAsRead(): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/notifications/mark-all-read`, {});
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/notifications/${id}`);
  }

  deleteAllNotifications(): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/notifications/all`);
  }

  subscribeToNotifications(): Observable<Notification> {
    // WebSocket implementation for real-time notifications
    return new Observable(observer => {
      const ws = new WebSocket(`${environment.wsUrl}/notifications`);
      
      ws.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      ws.onerror = (error) => observer.error(error);
      ws.onclose = () => observer.complete();

      return () => ws.close();
    });
  }

  updateNotificationPreferences(preferences: any): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/notifications/preferences`, preferences);
  }
}

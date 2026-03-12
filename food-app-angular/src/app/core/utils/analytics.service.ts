import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private readonly MAX_EVENTS = 100;
  private sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.generateSessionId();
  }

  trackEvent(name: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        url: window.location.href,
        userAgent: navigator.userAgent
      },
      timestamp: new Date()
    };

    this.events.push(event);

    if (this.events.length > this.MAX_EVENTS) {
      this.flushEvents();
    }
  }

  trackPageView(page: string): void {
    this.trackEvent('page_view', { page });
  }

  trackUserAction(action: string, details?: Record<string, any>): void {
    this.trackEvent('user_action', { action, ...details });
  }

  trackError(error: string, details?: Record<string, any>): void {
    this.trackEvent('error', { error, ...details });
  }

  trackSearch(query: string, results?: number): void {
    this.trackEvent('search', { query, results });
  }

  trackCheckout(cartValue: number, items: number): void {
    this.trackEvent('checkout_started', { cartValue, items });
  }

  trackOrderPlaced(orderId: string, value: number): void {
    this.trackEvent('order_placed', { orderId, value });
  }

  private flushEvents(): void {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    // Send analytics data to server
    this.http.post(`${environment.apiUrl}/analytics/events`, {
      events: eventsToSend
    }).subscribe({
      error: (error) => {
        console.error('Failed to send analytics:', error);
        // Re-add events if sending failed
        this.events = [...eventsToSend, ...this.events];
      }
    });
  }

  flushOnUnload(): void {
    window.addEventListener('beforeunload', () => {
      this.flushEvents();
    });
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  showSuccess(message: string, duration: number = 3000): void {
    this.showToast(message, 'success', duration);
  }

  showError(message: string, duration: number = 5000): void {
    this.showToast(message, 'error', duration);
  }

  showWarning(message: string, duration: number = 4000): void {
    this.showToast(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 3000): void {
    this.showToast(message, 'info', duration);
  }

  // Convenience methods
  success(message: string, duration: number = 3000): void {
    this.showSuccess(message, duration);
  }

  error(message: string, duration: number = 5000): void {
    this.showError(message, duration);
  }

  warning(message: string, duration: number = 4000): void {
    this.showWarning(message, duration);
  }

  info(message: string, duration: number = 3000): void {
    this.showInfo(message, duration);
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number): void {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, duration };
    
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.removeToast(id), duration);
    }
  }

  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }
}

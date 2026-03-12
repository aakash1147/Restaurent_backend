import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of (toasts$ | async)"
        [ngClass]="'toast toast-' + toast.type"
        class="toast-item"
      >
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
    }

    .toast-item {
      margin-bottom: 10px;
      padding: 15px 20px;
      border-radius: 4px;
      color: white;
      animation: slideIn 0.3s ease-in-out;
    }

    .toast-success {
      background-color: #4caf50;
    }

    .toast-error {
      background-color: #f44336;
    }

    .toast-warning {
      background-color: #ff9800;
    }

    .toast-info {
      background-color: #2196f3;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts$!: Observable<Toast[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }
}

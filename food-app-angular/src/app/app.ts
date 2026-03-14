import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, FooterComponent, ToastComponent, LoadingSpinnerComponent } from './shared/components';
import { LoadingService, ThemeService } from './core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('food-app-angular');
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService, private themeService: ThemeService) {
    this.isLoading$ = this.loadingService.loading$;
  }
}

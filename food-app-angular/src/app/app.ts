import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './website/layout/header.component';
import { FooterComponent } from './website/layout/footer.component';
import { AuthRoutingModule } from './auth/auth.routes';
import { WebsiteRoutingModule } from './website/website.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthRoutingModule, WebsiteRoutingModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('food-app-angular');
}

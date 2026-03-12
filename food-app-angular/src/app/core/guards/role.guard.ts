import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';
import { USER_ROLES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role'] as string;
    const user = this.authService.getCurrentUser();

    if (user && user.id) { // Add proper role checking based on your user model
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}

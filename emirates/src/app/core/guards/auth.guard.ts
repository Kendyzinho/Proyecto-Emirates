import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // Si es ruta admin, verificar que sea admin
      const isAdminRoute = state.url.includes('/admin');
      
      if (isAdminRoute) {
        if (this.authService.isAdmin()) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }
      return true;
    }

    // No logueado, redirigir a login
    this.router.navigate(['/login']);
    return false;
  }

}

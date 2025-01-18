import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  RouterStateSnapshot, 
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  
    constructor(
        private authService: AuthService, 
        private router: Router,
    ) {}

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
          .pipe(
            tap( (isAuthenticated) => console.log('Autheticated: ', isAuthenticated)),
            tap((isAuthenticated) => {
              if (!isAuthenticated) {
                this.router.navigate(['/auth/login']);
             }
            }),            
          );
      }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    console.log('CanMatch');
    console.log(route, segments);

    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    console.log('CanActivate');
    console.log({ route, state });

    return this.checkAuthStatus();
  }
}

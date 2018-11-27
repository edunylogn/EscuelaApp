import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Permissions } from './permissions'
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private permissions: Permissions, private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user.pipe(
            take(1),
            map(user => this.permissions.canActivate(user, next.routeConfig.path)),
            tap(loggedIn => {
              if (!loggedIn) {
                console.log('access denied')
                this.router.navigate(['/login']);
              }
            })
        )
    }
}

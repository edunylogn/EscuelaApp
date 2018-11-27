import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permissions } from '../../core/permissions';
import { AuthService } from '../../services/auth.service';
import { ResolveStart } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.less'],
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private permissions: Permissions, private breakpointObserver: BreakpointObserver, public auth: AuthService) {}

  logout(e) {
    e.preventDefault();
    this.auth.signOut();
  }

  activeLink(user, route) {
    return this.permissions.canActivate(user, route);
  }
}

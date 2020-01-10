// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthorizeService } from './authorize.service';
// import { tap } from 'rxjs/operators';
// import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizeGuard implements CanActivate {
//   constructor(private authorize: AuthorizeService, private router: Router) {
//   }
//   canActivate(
//     // tslint:disable-next-line: variable-name
//     _next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return this.authorize.isAuthenticated()
//       .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
//   }

//   private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
//     if (!isAuthenticated) {
//       this.router.navigate(ApplicationPaths.LoginPathComponents, {
//         queryParams: {
//           [QueryParameterNames.ReturnUrl]: state.url
//         }
//       });
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  // canActivate() {
  //     if (localStorage.getItem('Authorization')) {
  //         return true;
  //     }
  //     let pathname = location.pathname;
  //     if (pathname !== '/auth/login') {
  //         this.router.navigate(['/auth/login']);
  //     } else {
  //         this.router.navigate(['/auth/login'], { queryParams: { url: pathname } });
  //     }
  //     return false;
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}

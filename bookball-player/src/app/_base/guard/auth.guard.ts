import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

declare var $;

@Injectable()
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
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}

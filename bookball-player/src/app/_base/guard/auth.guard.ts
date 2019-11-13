import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

declare var $;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('Authorization')) {
            return true;
        }
        let pathname = location.pathname;
        if (pathname !== '/auth/login') {
            this.router.navigate(['/auth/login']);
        } else {
            this.router.navigate(['/auth/login'], { queryParams: { url: pathname } });
        }
        return false;
    }
}

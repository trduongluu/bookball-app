// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthorizeService } from './authorize.service';
// import { mergeMap, tap } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { NzNotificationService } from 'ng-zorro-antd';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizeInterceptor implements HttpInterceptor {
//   constructor(
//     private authorize: AuthorizeService,
//     private notification: NzNotificationService,
//     private router: Router
//   ) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return this.authorize.getAccessToken()
//       .pipe(mergeMap(token => this.processRequestWithToken(token, req, next)));
//   }

//   // Checks if there is an access_token available in the authorize service
//   // and adds it to the request in case it's targeted at the same origin as the
//   // single page application.
//   private processRequestWithToken(token: string, req: HttpRequest<any>, next: HttpHandler) {
//     if (!!token && this.isSameOriginUrl(req)) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(req).pipe(tap(() => { },
//       (err: any) => {
//         if (err instanceof HttpErrorResponse) {
//           switch (err.status) {
//             case 401:
//               this.router.navigateByUrl('/authentication/login');
//               break;
//             case 403:
//               this.notification.warning('AccessDenied', 'You don\'t have permission');
//               this.router.navigateByUrl('/');
//               break;
//             default:
//               break;
//           }
//         }
//       }));
//   }

//   private isSameOriginUrl(req: any) {

//     return true;

//     // It's an absolute url with the same origin.
//     if (req.url.startsWith(`${window.location.origin}/`)) {
//       return true;
//     }

//     // It's a protocol relative url with the same origin.
//     // For example: //www.example.com/api/Products
//     if (req.url.startsWith(`//${window.location.host}/`)) {
//       return true;
//     }

//     // It's a relative url like /api/Products
//     if (/^\/[^\/].*/.test(req.url)) {
//       return true;
//     }

//     // It's an absolute or protocol relative url that
//     // doesn't have the same origin.
//     return false;
//   }
// }


import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status === 401) {
              localStorage.removeItem('token');
              this.router.navigateByUrl('auth/login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}

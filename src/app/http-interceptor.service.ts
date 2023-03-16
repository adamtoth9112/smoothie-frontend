import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, Subscription, take } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: user.token,
          }),
        });
        return next.handle(authReq);
      })
    );

    /*if (
      this.authenticationService.isUserLoggedIn() &&
      req.url.indexOf('auth') === -1
    ) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(
            this.authenticationService.username +
              ':' +
              this.authenticationService.password
          )}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }*/
  }
}

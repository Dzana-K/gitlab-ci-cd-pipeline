import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../api/api/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token && !this.isAccessTokenExpired()) {
      console.log('hello')
      req = this.addTokenHeader(req, token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !req.url.includes('login') && error.status === 401) {
          console.log('hello')
          return this.handle401Error(req, next);
        }

        return throwError(error);
      })
    );
  }
  isAccessTokenExpired(): boolean {
    const accessToken = this.authService.getAccessToken();
    if (!accessToken) {
      return true;
    }

    const tokenData = this.parseJwt(accessToken);
    if (!tokenData || !tokenData.exp) {
      return true;
    }

    const expirationTime = tokenData.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    return expirationTime <= currentTime;
  }

  // Parse JWT to get token information
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();

      if (refreshToken) {
        console.log('hello')
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.authService.saveAccessToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logout(); // Adjust this based on your logout logic
            return throwError(err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
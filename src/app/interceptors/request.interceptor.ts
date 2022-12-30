import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { IUser } from "../entities/User";
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private notificationsService: NotificationsService,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }
  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<any> {
    const token = this.storageService.getKey('token');
    const authToken = token && token.authToken;
    let request = req;
    if (authToken) {
      request = req.clone({
        setHeaders: {
          authorization: authToken,
          contentType: 'application/json',
        },
      });
    } else {
      console.warn('No token found');
    }
    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.authService.user$.next(<IUser><unknown>null);
            this.storageService.clear();
            this.router.navigateByUrl('/login');
          }

          // if (err.status === 0)
          this.notificationsService.showAlert(err.error, 4000);

          return throwError(err);
        }),
      )
      .toPromise();
  }
}

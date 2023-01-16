import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = JSON.parse(localStorage.getItem('token')!);
    if (token && request.url.startsWith(`${environment.apiURL}`)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
    }
    return next.handle(request);
  }
}

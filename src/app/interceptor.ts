import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token') != null) {
        const token = localStorage.getItem('token')!
        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            .set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            .set('access-token', token)
            .set('Authorization', 'Bearer ' + token);
        const AuthRequest = request.clone({ headers: headers });
        return next.handle(AuthRequest);
    } else {
        return next.handle(request)
    }
  }
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("我进来了")
    let authReq = req;
    const token = sessionStorage.getItem("username")
    console.log(token)
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({headers: req.headers.append('Authorization',  token)});

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      console.log("tianjiale")
    }
    return next.handle(authReq)

  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthGuardService } from 'src/app/services/http/auth-guard.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authGuardService: AuthGuardService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authGuardService.getToken();
    if (authToken) {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    } else {
        return next.handle(req);
    }
  }
}
import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UserServiceImpl} from "./impl/user.service.impl";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: String;

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    this.token = UserServiceImpl.token;
    if (this.token !== "") {
       authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer_" + this.token)
      });
    }
    else {
       authReq = req.clone();
    }

    return next.handle(authReq)
      .pipe(
      tap(event => {
        if (event instanceof HttpResponse)
          console.log('Server response');
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if(err.status == 401) console.log('Unauthorized');
        }
      })
    );
  }
}

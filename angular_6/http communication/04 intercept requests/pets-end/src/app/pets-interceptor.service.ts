import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class PetsInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('processing request', req);

    const languageReq = req.clone({
      headers: req.headers.set('app-language', 'es')
    })

    return next
      .handle(languageReq)
      .pipe(
        tap((ev: HttpEvent<any>) => {
          if(ev instanceof HttpResponse) {
            console.log('processing response', ev);
          }
        }),
        catchError((response) => {
          if (response instanceof HttpErrorResponse) {
            console.log('processing error response', response);
          }

          return throwError(response);
        })
      );
  }

}

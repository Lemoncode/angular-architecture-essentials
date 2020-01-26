## In this demo we're going to work with interceptors. We start from a very simple application where we can get some data from server and rise an error.

* To intercept requests lets start by creating a new file `pets-interceptor.service.ts`

```
ng g s pets-interceptor --skipTests
```

__src\app\pets-interceptor.service.ts__

```typescript
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PetsInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('processing request', req);

    return next.handle(req);
  }

}

```
* Lets start by a simple implementation 
* This is just a service, but we have to register this service, in our `app.module`.

__src\app\app.module.ts__

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
-import { HttpClientModule } from '@angular/common/http';
+import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
+import { PetsInterceptorService } from './pets-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
+   {
+     provide: HTTP_INTERCEPTORS,
+     useClass: PetsInterceptorService,
+     multi: true
+   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
* Notice `multi: true`, this is because we want to register multiple interceptors and not just one.
* If we run the application now we must see a console message from our interceptor.

* It's typical to register custom headers in our requests, lets see how to do that.

__src\app\pets-interceptor.service.ts__

```diff pets-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PetsInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('processing request', req);
+
+    const languageReq = req.clone({
+      headers: req.headers.set('app-language', 'es')
+    })
+
-   return next.handle(req);
+   return next.handle(languageReq);
  }

}

```
* If we inspect headers on dev tools we will notice that our header has been set.

* One thing that might be want to do is handling the response as well. `next.handle()` is returning an observable, so we can handle on it.

__src\app\pets-interceptor.service.ts__

```diff
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
+import { tap } from 'rxjs/operators';

@Injectable()
export class PetsInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('processing request', req);

    const languageReq = req.clone({
      headers: req.headers.set('app-language', 'es')
    })

    return next
      .handle(languageReq)
+     .pipe(
+       tap((ev: HttpEvent<any>) => {
+         if(ev instanceof HttpResponse) {
+           console.log('processing response', ev);
+         }
+       })
+     );
  }

}

```
* If we run the applicatin we must see the processing of the request.

* For last we want to handle here as well the error when is raised.

__src\app\pets-interceptor.service.ts__

```diff
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
-import { tap } from 'rxjs/operators';
+import { tap, catchError } from 'rxjs/operators';

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
+       catchError((response) => {
+         if (response instanceof HttpErrorResponse) {
+           console.log('processing error response', response);
+         }
+
+         return throwError(response);
+       })
+     );
  }

}

```

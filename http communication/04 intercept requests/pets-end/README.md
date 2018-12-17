# Pets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## In this demo we're going to work with interceptors. We start from a very simple application where we can get some data from server and rise an error.

* To intercept requests lets start by creating a new file `http.interceptor.ts`

```typescript http.interceptor.ts
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
* This is just a service, but we have to register this service, in other way in our `app.module`

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

```diff pets-interceptor.service.ts
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

```diff pets-interceptor.service.ts
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

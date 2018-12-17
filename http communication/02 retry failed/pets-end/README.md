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

* Lets imagine that we have a call to a server that has produced a failure, on strategy that we can follow it's to retry call 

```diff pets.service
import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
+import { retry } from 'rxjs/operators'

import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) { }

  fetchPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(
      `${this.baseUrl}/${id}`
+    ).pipe(
+      retry(3)
+    );
  }
}

```

* Now when we run again and try to fetch the elements we can see that there are three attemps.

* Retry consecutive calls to server, might not be the betst due to we are making consecutive calls to the server.

* We can also make these calls to the server after a while.

```diff people.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams
} from '@angular/common/http';
import { 
  Observable,
+ of,
+ throwError
} from 'rxjs';
import {
- retry,
+ retryWhen,
+ delay,
+ flatMap
} from 'rxjs/operators';

import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) { }

  fetchPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(
      `${this.baseUrl}/${id}`
    ).pipe(
-     retry(3)
+     retryWhen((err) => {
+       let retries = 3;
+       return err.pipe(
+         delay(1000),
+         flatMap((error) => {
+           if (retries-- > 0) {
+             return of(error)
+           } else {
+             return throwError(error)
+           }
+         })
+       )
+     })
    );
  }
}

```

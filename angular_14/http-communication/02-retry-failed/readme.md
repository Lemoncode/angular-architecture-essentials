# Retry on failed

- Lets imagine that we have a call to a server that has produced a failure, on strategy that we can follow it's to retry call

**src/app/pets.service.ts**

```diff
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

- Now when we run again and try to fetch the elements we can see that there are three attemps.

- Retry consecutive calls to server, might not be the best due to we are making consecutive calls to the server.

- We can also make these calls to the server after a while.

```diff
# pet.service.ts
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
+ mergeMap
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
+         mergeMap((error) => {
+           if (retries-- > 0) {
+             return of(error)
+           }
+           return throwError(error)
+         })
+       )
+     })
    );
  }
}

```

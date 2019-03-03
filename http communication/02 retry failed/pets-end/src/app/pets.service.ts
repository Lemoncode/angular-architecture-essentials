import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams
} from '@angular/common/http';
import { Observable,
  of,
  throwError
} from 'rxjs';
import {
  retryWhen,
  delay,
  flatMap
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
      // retry(3)
      retryWhen((err) => {
        let retries = 3;
        return err.pipe(
          delay(1000),
          flatMap((error) => {
            if (retries-- > 0) {
              return of(error);
            } else {
              return throwError(error);
            }
          })
        )
      })
    );
  }
}

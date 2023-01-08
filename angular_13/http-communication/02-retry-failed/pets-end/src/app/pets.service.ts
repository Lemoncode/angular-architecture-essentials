import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retryWhen, delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) {}
  
  fetchPets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<PetModel> {
    return this.http.get<PetModel>(
      `${this.baseUrl}/${id}`
    ).pipe(
      // retry(3)
      retryWhen((err) => {
        let retries = 3;
        return err.pipe(
          delay(1000),
          mergeMap((error) => {
            if (retries-- > 0) {
              return of(error)
            }
            return throwError(error);
          })
        )
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';
import {
  HttpClient,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retryWhen, delay, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  constructor(private http: HttpClient) { }

  fetchPets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(this.baseUrl);
  }

  fetchPetById(id: string): Observable<PetModel> {
    return this.http.get<PetModel>(
      `${this.baseUrl}/${id}`
    ).pipe(
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

  uplaodPetImage(id, data): Observable<HttpEvent<Object>> {
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/${id}/image`,
      data,
      { reportProgress: true }
    );

    return this.http.request(req);
  }
}

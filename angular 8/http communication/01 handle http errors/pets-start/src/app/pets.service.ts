import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    );
  }
}

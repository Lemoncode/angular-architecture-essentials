import { Injectable } from '@angular/core';
import { PetModel } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private baseUrl = '/api/v1/pets';

  fetchPets(): Promise<PetModel> {
    return fetch(this.baseUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Check type of response, it will be rejected any way.
      });
  }
}

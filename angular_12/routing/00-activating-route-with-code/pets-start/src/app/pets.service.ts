import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets = [
    { name: 'Frank' },
    { name: 'Maui' },
    { name: 'Laika' },
  ];

  fetchPets() {
    return this.pets;
  }
}

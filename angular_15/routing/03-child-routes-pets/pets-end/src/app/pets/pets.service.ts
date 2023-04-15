import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets = [
    {
      name: 'Frank',
      species: 'dog',
      toys: [
        'rope',
        'ball',
      ]
    },
    {
      name: 'Maui',
      species: 'cat',
      toys: [
        'teddy bear'
      ]
    },
    {
      name: 'Laika',
      species: 'dog',
      toys: [
        'cookies'
      ]
    },
  ];

  fetchPets() {
    return this.pets;
  }

  fetchPetByName(name: string) {
    return this.pets.find((p) => p.name === name);
  }

  fetchPetToys(name: string) {
    const pet = this.fetchPetByName(name);
    return (pet) ? pet.toys : [];
  }
}

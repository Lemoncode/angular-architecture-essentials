import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets = [
    {
      name: 'Frank',
      espicy: 'dog',
      toys: [
        'rope',
        'ball',
      ]
    },
    {
      name: 'Maui',
      espicy: 'cat',
      toys: [
        'teddy bear'
      ]
    },
    {
      name: 'Laika',
      espicy: 'dog',
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

  fetcPetToys(name: string) {
    const pet = this.fetchPetByName(name)
    return (pet) ? pet.toys : [];
  }
}

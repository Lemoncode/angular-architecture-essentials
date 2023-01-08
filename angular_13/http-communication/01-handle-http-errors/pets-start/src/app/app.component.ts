import { Component } from '@angular/core';
import { PetModel } from './pet.model';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li *ngFor="let pet of pets"
        (click)="fetchPet(pet.id)">
        {{pet.name}}
      </li>
    </ul>

    <hr>

    <span>{{selectedPet?.name}}</span>
  `,
})
export class AppComponent {
  pets: PetModel[] | null = null;
  selectedPet: PetModel | undefined;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets() 
      .subscribe((result) => {
        this.pets = result;
        this.pets.push({
          id: Date.now(),
          name: 'Unknown',
          species: 'Unknown'
        });
      });
  }

  fetchPet(id: number) {
    this.petsService.fetchPetById(id.toString())
      .subscribe((result) => {
        this.selectedPet = result;
      })
  }
}

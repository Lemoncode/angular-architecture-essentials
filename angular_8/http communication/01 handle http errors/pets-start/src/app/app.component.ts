import { Component } from '@angular/core';
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
  `
})
export class AppComponent {
  pets;
  selectedPet;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets()
      .subscribe((result) => {
        this.pets = result;
        this.pets.push({
          id: Date.now(),
          name: 'Unknown',
          spicies: 'Unknown'
        })
      });
  }

  fetchPet(id: string) {
    this.petsService.fetchPetById(id)
      .subscribe((result) => {
        this.selectedPet = result;
      });
  }
}

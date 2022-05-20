import { Component } from '@angular/core';
import { PetModel } from './pet.model';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li *ngFor="let pet of pets">{{pet.name}}</li>
    </ul>
  `,
})
export class AppComponent {
  pets: PetModel[] | null = null;

  constructor(private petsService: PetsService) {}

  async fetchPets() {
    // this.petsService.fetchPets()
    //   .then((result) => {
    //     this.pets = result
    //   });
    this.pets = await this.petsService.fetchPets();
  }
}

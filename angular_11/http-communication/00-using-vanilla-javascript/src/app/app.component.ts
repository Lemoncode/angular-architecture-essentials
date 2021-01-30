import { Component } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr />

    <ul>
      <li *ngFor="let pet of pets">{{ pet.name }}</li>
    </ul>
  `,
})
export class AppComponent {
  pets;

  constructor(private petsSrv: PetsService) {}

  async fetchPets() {
    this.pets = await this.petsSrv.fetchPets();
  }
}

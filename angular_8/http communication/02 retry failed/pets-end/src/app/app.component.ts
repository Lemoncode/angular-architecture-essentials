import { Component } from '@angular/core';
import { PetsService } from './pets.service';

import { HttpErrorResponse } from '@angular/common/http';


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
    <p *ngIf="message">
      {{message}}
    </p>
  `
})
export class AppComponent {
  pets;
  selectedPet;
  message;

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
      }, (err: HttpErrorResponse) => {
        if (err instanceof Error) {
          this.message = `An error occured ${err.error.message}`;
        } else {
          this.message = `Backend returned error code ${err.status}`;
        }
      });
  }
}

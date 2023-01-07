import { Component } from '@angular/core';
import { PetModel } from './pet.model';
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
  `,
})
export class AppComponent {
  pets: PetModel[] | null = null;
  selectedPet: PetModel | undefined;
  message: string | undefined;
  
  constructor(private petsService: PetsService) {}

  fetchPets() {
    // this.petsService.fetchPets()
    //   .then((result) => {
    //     this.pets = result
    //   });
    // this.pets = await this.petsService.fetchPets();
    this.petsService.fetchPets()
      .subscribe((result) => {
        this.pets = result;
        this.pets.push({
          id: Date.now(),
          name: 'Unnown',
          species: 'Unknown'
        });
      });
  }

  fetchPet(id: number) {
    this.petsService.fetchPetById(id.toString())
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

import { Component } from '@angular/core';
import { PetsService } from './pets.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr>

    <ul>
      <li
      (click)="fetchPet(pet.id)"
      *ngFor="let pet of pets">{{pet.name}}
      </li>
    </ul>

    <hr>

    <span>{{selectedPet?.name}}</span>
    <p *ngIf="message">
      {{message}}
    </p>

    <hr>

    <input type="file" #fileUpload>
    <button (click)="uploadImage(fileUpload)">Upload</button>
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
          spicy: 'Unknown'
        });
      });
  }

  fetchPet(id: string) {
    this.petsService.fetchPetById(id)
      .subscribe(
        (result) => this.selectedPet = result,
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            this.message = `An error occured ${err.error.message}`;
          } else {
            this.message = `Backend returned error code ${err.status}`;
          }
        }
      );
  }

  uploadImage(fileUpload) {
    const formData = new FormData();
    formData.append('image', fileUpload.files[0], 'image.jpg');
  }
}

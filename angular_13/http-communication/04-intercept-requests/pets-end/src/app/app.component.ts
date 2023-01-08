import { Component } from '@angular/core';
import { PetModel } from './pet.model';
import { PetsService } from './pets.service';

import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="fetchPets()">Fetch Pets</button>

    <hr />

    <ul>
      <li *ngFor="let pet of pets" (click)="fetchPet(pet.id)">
        {{ pet.name }}
      </li>
    </ul>

    <hr />

    <span>{{ selectedPet?.name }}</span>
    <p *ngIf="message">
      {{ message }}
    </p>

    <hr />

    <input type="file" #fileUpload />
    <button (click)="uploadImage(fileUpload)">Upload</button>
    <p *ngIf="progress">{{ progress }}</p>
  `,
})
export class AppComponent {
  pets: PetModel[] | null = null;
  selectedPet: PetModel | undefined;
  message: string | undefined;
  progress: string | undefined;

  constructor(private petsService: PetsService) {}

  fetchPets() {
    this.petsService.fetchPets().subscribe((result) => {
      this.pets = result;
      this.pets.push({
        id: Date.now(),
        name: 'Unknown',
        species: 'Unknown',
      });
    });
  }

  fetchPet(id: number) {
    this.petsService.fetchPetById(id.toString()).subscribe({
      next: (result) => {
        this.selectedPet = result;
      },
      error: (err: HttpErrorResponse) => {
        if (err instanceof Error) {
          this.message = `An error occured ${err.error.message}`;
        } else {
          this.message = `Backend returned error code ${err.status}`;
        }
      },
    });
  }

  uploadImage(fileUpload: any) {
    const formData = new FormData();
    formData.append('image', fileUpload.files[0], 'image.jpg');
    this.petsService
      .uploadPetImage(this.selectedPet?.id!, formData)
      .subscribe((res) => {
        if (res.type === HttpEventType.UploadProgress) {
          const percentage = Math.round((100 * res.loaded) / res.total!);
          this.progress = `File is ${percentage}% uploaded`;
        } else if (res instanceof HttpResponse) {
          this.progress = "File uploaded complete";
        }
      })
  }
}

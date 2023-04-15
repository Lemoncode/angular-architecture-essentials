import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets-toys',
  template: `
    <div
      style="display: flex; justify-content: space-between"
      *ngFor="let pet of pets"
    >
      <p>
        {{ pet }}
      </p>
      <button style="height: 20px;" (click)="showToys(pet)">Select Pet</button>
    </div>

    <hr />
    <h2>{{ selectedPet }}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: [],
})
export class PetsToysComponent implements OnInit {
  toys: any;
  pets: string[] = [];
  selectedPet: string = '';

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  showToys(pet: string): void {
    this.router
      .navigate(['/pets', pet, 'toys'])
      .then((res) => console.log('you get to your destiny', pet));
  }

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets().map(({ name }) => name);
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.selectedPet = this.petsService.fetchPetByName(id)!.name;
      this.toys = this.petsService.fetchPetToys(this.selectedPet);
    });
  }
}

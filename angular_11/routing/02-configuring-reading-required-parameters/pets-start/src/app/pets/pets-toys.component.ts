import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets-toys',
  template: `
    <div
    style="display: flex; justify-content: space-between"
    *ngFor="let pet of pets">
      <p>
        {{pet}}
      </p>
      <button style="height: 20px;">Select Pet</button>
    </div>

    <hr>
    <h2>{{selectedPet}}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: [],
})
export class PetsToysComponent implements OnInit {
  toys;
  pets: string[];
  selectedPet: string;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pets = this.petsService.fetchPets().map(({ name }) => name);
    this.selectedPet = this.route.snapshot.paramMap.get('id');
    this.toys = this.petsService.fetchPetToys(this.selectedPet);
  }
}

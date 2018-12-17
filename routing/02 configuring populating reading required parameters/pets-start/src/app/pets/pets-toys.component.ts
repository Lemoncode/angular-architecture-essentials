import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pets-toys',
  template: `
    <div
    style="display: flex; justify-content: space-between"
    *ngFor="let pet of pets">
      <p>
        {{pet}}
      </p>
      <button style="height: 20px;" (click)="showToys(pet)">Select Pet</button>
    </div>

    <hr>
    <h2>{{selectedPet}}</h2>
    <app-pet-toys [toys]="toys"></app-pet-toys>
  `,
  styles: []
})
export class PetsToysComponent implements OnInit {
  toys;
  pets: string[];
  selectedPet: string;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pets = this.petsService.fetchPets()
      .map((p) => p.name);
    this.selectedPet = this.route.snapshot.paramMap.get('id');
    this.toys = this.petsService.fetcPetToys(this.selectedPet);
  }

}

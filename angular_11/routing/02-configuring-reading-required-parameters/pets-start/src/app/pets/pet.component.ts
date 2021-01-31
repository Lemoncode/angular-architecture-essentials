import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pet',
  template: `
    <div style="display:flex; justify-content:space-between">
      <p>
        {{ pet.name }}
      </p>
      <p>
        {{ pet.species }}
      </p>
      <a [routerLink]="['/pets', pet.name, 'toys']">Visit my toys</a>
    </div>
  `,
  styles: [],
})
export class PetComponent implements OnInit {
  pet;
  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const petName = this.route.snapshot.paramMap.get('id');
    const { name, species } = this.petsService.fetchPetByName(petName);
    this.pet = { name, species };
  }
}

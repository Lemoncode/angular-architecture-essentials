import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet',
  template: `
    <div style="display:flex; justify-content:space-between">
      <p>
        {{ pet.name }}
      </p>
      <p>
        {{ pet.espicy }}
      </p>
      <a [routerLink]="['/pets', pet.name, 'toys']">Visit my toys</a>
    </div>
  `,
  styles: []
})
export class PetComponent implements OnInit {
  pet;
  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute // Contains the info about route associated with component loaded in an outlet
  ) { }

  ngOnInit() {
    const petName = this.route.snapshot.paramMap.get('id');
    const { name, espicy } = this.petsService.fetchPetByName(petName);
    this.pet  = { name, espicy };
  }

}

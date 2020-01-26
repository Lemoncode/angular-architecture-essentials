import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  template: `
    <p *ngFor="let pet of pets">
      {{ pet.name }}
    </p>
  `,
  styles: []
})
export class PetsComponent implements OnInit {
  pets;
  constructor(private petsService: PetsService) { }

  ngOnInit() {
    this.pets = this.petsService.fetchPets();
  }

}

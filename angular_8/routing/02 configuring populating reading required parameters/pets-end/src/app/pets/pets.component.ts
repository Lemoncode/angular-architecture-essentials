import { Component, OnInit } from '@angular/core';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  template: `
    <ul>
      <li *ngFor="let pet of pets">
        <a [routerLink]="['/pets', pet.name]">{{ pet.name }}</a>
      </li>
    </ul>
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

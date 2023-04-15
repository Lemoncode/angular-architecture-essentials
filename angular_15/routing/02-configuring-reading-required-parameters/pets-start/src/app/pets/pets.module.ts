import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { PetComponent } from './pet.component';
import { PetToysComponent } from './pet-toys.component';
import { PetsToysComponent } from './pets-toys.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PetsComponent,
    PetComponent,
    PetToysComponent,
    PetsToysComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports: [
    PetsComponent,
    PetComponent,
    PetsToysComponent
  ]
})
export class PetsModule { }

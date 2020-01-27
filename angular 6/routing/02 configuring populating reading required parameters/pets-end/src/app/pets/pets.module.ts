import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetComponent } from './pet.component';
import { PetToysComponent } from './pet-toys.component';
import { PetsToysComponent } from './pets-toys.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PetsComponent,
    PetComponent,
    PetToysComponent,
    PetsToysComponent,
  ],
  exports: [
    PetsComponent,
    PetComponent,
    PetsToysComponent
  ]
})
export class PetsModule { }

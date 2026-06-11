import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetToysComponent } from './pet-toys.component';
import { PetComponent } from './pet.component';
import { PetsToysComponent } from './pets-toys.component';
import { PetsComponent } from './pets.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PetToysComponent,
    PetComponent,
    PetsToysComponent,
    PetsComponent,
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
export class PetsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list.component';
import { PeopleService } from './people.service';



@NgModule({
  declarations: [
    PeopleListComponent
  ],
  exports: [PeopleListComponent],
  providers: [PeopleService],
  imports: [
    CommonModule
  ]
})
export class PeopleModule { }

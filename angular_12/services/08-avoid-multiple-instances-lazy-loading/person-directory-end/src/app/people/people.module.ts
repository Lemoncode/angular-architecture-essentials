import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list.component';
import { PeopleService } from './people.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PeopleListComponent],
  exports: [PeopleListComponent],
  // providers: [PeopleService]
})
export class PeopleModule { 
  // static forRoot(): ModuleWithProviders<PeopleModule> {
  //   return {
  //     ngModule: PeopleModule,
  //     providers: [PeopleService]
  //   }
  // }
  static forRoot(): ModuleWithProviders<PeopleModule> {
    return {
      ngModule: PeopleModule,
      providers: [
        {provide: PeopleService, useClass: PeopleService }
      ]
    };
  }
}

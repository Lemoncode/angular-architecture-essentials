import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { PeopleModule } from '../people/people.module';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PeopleModule,
    EmployeesRoutingModule
  ],
  declarations: [EmployeesComponent]
})
export class EmployeesModule { }

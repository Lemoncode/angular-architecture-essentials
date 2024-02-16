import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { PeopleModule } from '../people/people.module';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    PeopleModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }

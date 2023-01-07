import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class EmployeesRoutingModule { }

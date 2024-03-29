import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PeopleModule } from './people/people.module';
// import { EmployeesModule } from './employees/employees.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PeopleModule, 
    // EmployeesModule
    PeopleModule.forRoot()
  ],
  providers: [
    // PeopleModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

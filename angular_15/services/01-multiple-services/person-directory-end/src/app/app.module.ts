import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonEditComponent } from './person-edit.component';
import { ChildComponent } from './child.component';
import { PersonService } from './person.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonEditComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

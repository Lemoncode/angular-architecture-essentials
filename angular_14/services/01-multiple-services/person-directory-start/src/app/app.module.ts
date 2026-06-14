import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonService } from './person.service';
import { ChildComponent } from './child.component';
import { PersonEditComponent } from './person-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    PersonEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

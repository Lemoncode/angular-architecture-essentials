import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonComponent } from './person.component';
import { LoggerService } from './service/logger.service';
import { NewLoggerService } from './service/new-logger.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: LoggerService, useExisting: NewLoggerService }, 
    NewLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

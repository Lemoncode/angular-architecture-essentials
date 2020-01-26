import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    NewLoggerService,
    { provide: LoggerService, useExisting: NewLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

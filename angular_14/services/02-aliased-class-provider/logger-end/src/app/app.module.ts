import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonService } from './person.service';
import { ChildComponent } from './child.component';
import { PersonEditComponent } from './person-edit.component';
import { LoggerService } from './service/logger.service';
import { PersonComponent } from './person.component';
import { NewLoggerService } from './service/new-logger.service';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    PersonEditComponent,
    PersonComponent,
  ],
  imports: [BrowserModule],
  providers: [
    PersonService,
    { provide: LoggerService, useExisting: NewLoggerService },
    NewLoggerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

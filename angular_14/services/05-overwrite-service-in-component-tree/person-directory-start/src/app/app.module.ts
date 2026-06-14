import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonService } from './person.service';
import { ChildComponent } from './child.component';
import { PersonEditComponent } from './person-edit.component';
import { LoggerService } from './service/logger.service';
import { PersonComponent } from './person.component';
import { WriterService } from './service/writer.service';
// import { NewLoggerService } from './service/new-logger.service';

// const simpleLogger = {
//   log(msg: string) {
//     console.log(`I am a simple logger; ${msg}`);
//   }
// }

const loggerFactory = (writer: WriterService) => {
  return new LoggerService(true, writer);
};

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    PersonEditComponent,
    PersonComponent,
  ],
  imports: [BrowserModule],
  providers: [
    WriterService,
    {
      provide: LoggerService,
      useFactory: loggerFactory,
      deps: [WriterService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

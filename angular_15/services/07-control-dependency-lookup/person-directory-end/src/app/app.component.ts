import { Component } from '@angular/core';
import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-root',
  template: `
    <h2>Logger Service</h2>
    <app-person></app-person>
  `,
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory('AppComponent'),
    }
  ],
})
export class AppComponent {
  title = 'person-directory';
}

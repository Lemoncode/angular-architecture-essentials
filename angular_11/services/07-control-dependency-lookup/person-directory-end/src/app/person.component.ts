import { Component, OnInit, Optional, SkipSelf, Host } from '@angular/core';
import { LoggerService, loggerFactory } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `,
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory('PersonComponent'),
    }
  ]
})
export class PersonComponent implements OnInit {

  constructor(@Host() @Optional() public logger: LoggerService) { }

  ngOnInit() {
  }

  doLog() {
    if (this.logger) {
      this.logger.log('Message from person component');
    } else {
      console.log('no logger available');
    }
  }

}

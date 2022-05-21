import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div style="border:1px;">
      <p *ngIf="logger === null">No logger</p>
      <button (click)="doLog()">write log</button>
    </div>
  `
})
export class PersonComponent implements OnInit {

  constructor(public logger: LoggerService) { }

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

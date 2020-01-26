import { Component, OnInit } from '@angular/core';
import { LoggerService } from './service/logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div>
      Loggin component;
    </div>
    <button (click)="doLog()">Log to console</button>
  `,
  styles: []
})
export class PersonComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
  }

  doLog() {
    this.logger.log('Message from component');
  }

}

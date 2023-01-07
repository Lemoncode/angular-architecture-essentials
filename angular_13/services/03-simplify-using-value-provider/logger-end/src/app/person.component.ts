import { Component, OnInit } from '@angular/core';
import { LoggerService } from './service/logger.service';

@Component({
  selector: 'app-person',
  template: `
    <div>
      person works!
    </div>
    <button (click)="doLog()">Log to console</button>
  `,
  styles: [
  ]
})
export class PersonComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
  }

  doLog() {
    this.logger.log('Message from component');
  }

}

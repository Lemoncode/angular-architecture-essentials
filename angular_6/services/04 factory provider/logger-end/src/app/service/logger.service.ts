import { Injectable } from '@angular/core';
import { WriterService } from './writer.service';


@Injectable()
export class LoggerService {

  // constructor(private isEnabled: boolean) { }
  constructor(private isEnabled: boolean, private writer: WriterService) { }

  log(msg: string) {
    if (this.isEnabled) {
      // console.log(`Logger: ${msg}`);
      this.writer.write(msg);
    }
  }
}

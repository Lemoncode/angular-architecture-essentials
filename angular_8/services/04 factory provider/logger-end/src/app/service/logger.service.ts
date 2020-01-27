import { Injectable } from '@angular/core';
import { WriterService } from './writer.service';

@Injectable()
export class LoggerService {

  constructor(
    private isEnabled: boolean,
    private writer: WriterService
    ) { }

  log(msg: string) {
    if (this.isEnabled) {
      this.writer.write(msg);
      // console.log(`Logger: ${msg}`);
    }
  }
}

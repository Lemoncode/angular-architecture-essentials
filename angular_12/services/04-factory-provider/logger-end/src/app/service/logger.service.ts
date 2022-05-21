import { Inject, Injectable } from '@angular/core';
import { WriterService } from './writer.service';

@Injectable()
export class LoggerService {

  constructor(@Inject(Boolean) private isEnabled: boolean, private writer: WriterService) { }

  log(msg: string) {
    if (this.isEnabled) {
      // console.log(`logger: ${msg}`);
      this.writer.write(msg);
    }
  }
}

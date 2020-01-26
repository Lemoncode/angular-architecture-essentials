import { Injectable } from '@angular/core';

@Injectable()
export class WriterService {
  write(msg: string) {
    console.log(msg);
  }
}

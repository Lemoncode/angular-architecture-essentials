import { Injectable } from '@angular/core';

@Injectable()
export class NewLoggerService {
  constructor() {}

  log(msg: string) {
    console.log(`New Logger: ${msg}`);
  }
}

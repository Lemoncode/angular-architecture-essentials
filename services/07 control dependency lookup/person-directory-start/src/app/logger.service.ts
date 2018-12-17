import { Injectable } from '@angular/core';

export const loggerFactory = (prefix) => () => new LoggerService(prefix)

@Injectable()
export class LoggerService {
  constructor(private prefix: string) {}

  log(msg: string) {
    console.log(`Logger (${this.prefix}): ${msg}`);
  }
}

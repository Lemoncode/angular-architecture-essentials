import { Inject, Injectable } from '@angular/core';

export const loggerFactory = (prefix: string) => () => new LoggerService(prefix);

@Injectable()
export class LoggerService {

  constructor(@Inject(String) private prefix: string) { }

  log(msg: string) {
    console.log(`Logger (${this.prefix}): ${msg}`);
  }
}

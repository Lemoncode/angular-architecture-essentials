import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewLoggerService {

  constructor() { }

  log(msg: string) {
    console.log(`New logger: ${msg}`);
  }
}

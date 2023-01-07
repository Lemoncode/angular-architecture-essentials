import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewLoggerService {

  constructor() { }

  log(msg: string): void {
    console.log(`New Logger: ${msg}`);
  }
}

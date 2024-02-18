import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  online = true;
  constructor() {
    console.log('service constructor');
    setInterval(() => {
      this.online = Math.random() > 0.5;
      console.log(this.online);
    }, 1000);
  }
}

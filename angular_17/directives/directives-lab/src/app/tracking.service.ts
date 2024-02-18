import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  logs: string[] = [];
  
  log(trackingEvent: string) {
    this.logs.push(trackingEvent);
    console.log(this.logs);
  }
}

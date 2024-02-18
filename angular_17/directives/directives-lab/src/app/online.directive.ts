import { Directive, HostBinding } from '@angular/core';
import { OnlineService } from './online.service';

@Directive({
  selector: '[online]',
  standalone: true,
})
export class OnlineDirective {
  @HostBinding('disabled') get disabled() {
    return this.online.online;
  }
  /*diff*/
  @HostBinding('class.offline') get offline() {
    return this.online.online;
  }
  /*diff*/
  constructor(private online: OnlineService) {
    console.log('directive invoked');
  }
}

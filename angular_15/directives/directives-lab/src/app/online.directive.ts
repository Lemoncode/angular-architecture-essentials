import { Directive, HostBinding } from '@angular/core';
import { OnlineService } from './online.service';

@Directive({
  selector: '[online]'
})
export class OnlineDirective {
  @HostBinding('disabled') get disabled() {
    return this.online.online;
  }

  @HostBinding('class.offline') get offline() {
    return this.online.online;
  }

  constructor(private online: OnlineService) { }

}

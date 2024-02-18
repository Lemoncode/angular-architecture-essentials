import { Directive } from '@angular/core';

@Directive({
  selector: '[online]',
  standalone: true
})
export class OnlineDirective {

  constructor() { }

}

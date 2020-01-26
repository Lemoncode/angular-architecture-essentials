import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicCarouselItemAnchor]'
})
export class DynamicCarouselItemAnchorDirective {

  constructor(public viewContainer: ViewContainerRef) { }

}

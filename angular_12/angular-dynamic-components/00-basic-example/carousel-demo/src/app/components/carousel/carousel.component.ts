import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { DynamicCarouselItemAnchorDirective } from '../dynamic-carousel-item-anchor.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild(DynamicCarouselItemAnchorDirective) dynamicPlaceHolder!:
  DynamicCarouselItemAnchorDirective;
  items: CarouselItemComponent[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  addCarouselItem(template: any, data: any) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(CarouselItemComponent);
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer; // [2]

    const componentRef = viewContainerRef.createComponent(componentFactory); // [3]
    const instance: CarouselItemComponent = componentRef.instance as CarouselItemComponent;
    instance.template = template; //[4]
    instance.dataContext = data;
    this.items.push(instance); // [5]
  }

}

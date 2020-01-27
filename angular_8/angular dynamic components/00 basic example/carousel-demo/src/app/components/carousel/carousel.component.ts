import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { DynamicCarouselItemAnchorDirective } from '../dynamic-carousel-item-anchor.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild(DynamicCarouselItemAnchorDirective, { static: false })
  dynamicPlaceHolder: DynamicCarouselItemAnchorDirective;
  items: CarouselItemComponent[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  addCarouselItem(template, data) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(CarouselItemComponent);
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);

    const instance: CarouselItemComponent = componentRef.instance as CarouselItemComponent;
    instance.template = template;
    instance.dataContext = data;
    this.items.push(instance);
  }

}

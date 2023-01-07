import {
  Component,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { DynamicCarouselItemAnchorDirective } from '../dynamic-carousel-item-anchor.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @ViewChild(DynamicCarouselItemAnchorDirective) dynamicPlaceHolder: DynamicCarouselItemAnchorDirective;
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

  activeCarouselItem(item) {
    this.resetActiveCarouselItems();
    this.items
      .find((i) => i.dataContext.id === item.id)
      .toggleActive();
  }

  private resetActiveCarouselItems = () => (
    this.items.forEach((i) => i.active = false)
  );

  deleteActiveCarouselItem(id: number) {
    // Fetch the instance that have to be removed
    const activeIndex = this.items.findIndex(i => i.dataContext.id === id && i.active);
    this.items.splice(activeIndex, 1);
    // To ensure we have destroy our component we have to get a reference to the view container ref
    // and remove it from here.
    const viewContainerRef = this.dynamicPlaceHolder.viewContainer;
    viewContainerRef.remove(activeIndex);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { DynamicCarouselItemAnchorDirective } from './dynamic-carousel-item-anchor.directive';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CarouselComponent,
    DynamicCarouselItemAnchorDirective,
    CarouselItemComponent
  ],
  exports: [
    CarouselComponent,
    CarouselItemComponent,
  ],
  entryComponents: [
    CarouselItemComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { DynamicCarouselItemAnchorDirective } from './dynamic-carousel-item-anchor.directive';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    CarouselComponent,
    DynamicCarouselItemAnchorDirective,
    CarouselItemComponent,
  ],
  exports: [
    CarouselComponent,
    CarouselItemComponent,
  ],
  entryComponents: [
    CarouselItemComponent
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}

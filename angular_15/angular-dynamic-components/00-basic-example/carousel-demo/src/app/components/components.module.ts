import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { DynamicCarouselItemAnchorDirective } from './dynamic-carousel-item-anchor.directive';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';



@NgModule({
    declarations: [
        CarouselComponent,
        DynamicCarouselItemAnchorDirective,
        CarouselItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CarouselComponent,
        CarouselItemComponent
    ]
})
export class ComponentsModule { }

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent {
  @Input() template;
  @Input() dataContext;
  active = false;

  toggleActive() {
    this.active = true;
  }
}

import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from './tracking.service';

@Directive({
  selector: '[track]',
  standalone: true,
})
export class TrackDirective {
  @Input() track!: string;

  @HostListener('click')
  onClick() {
    this.trackService.log(
      JSON.stringify({ event: 'click', message: this.track })
    );
  }

  @HostListener("mouseover")
  onMouseover() {
    this.trackService.log(
      JSON.stringify({ event: "mouseover", message: this.track })
    );
  }

  constructor(private trackService: TrackingService) {}
}

import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[first]',
  standalone: true,
})
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = '';

  @HostListener('click', ['$event']) 
  onClick($event: Event) {
    this.innerText = 'clicked';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes['first'].currentValue;
  }
}

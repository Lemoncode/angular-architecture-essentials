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
})
export class FirstDirective implements OnChanges {
  @Input() first!: string;
  @HostBinding() innerText = '';
  @HostListener('click', ['$event']) 
  onClick($event: Event) {
    console.log($event);
    this.innerText = 'clicked';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.innerText = changes['first'].currentValue;
  }
}

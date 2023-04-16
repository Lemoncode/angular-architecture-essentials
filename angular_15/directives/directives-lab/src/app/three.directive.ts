import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[three]',
})
export class ThreeDirective {
  private readonly context = { message: '' };

  @Input('three') set three(value: any) {
    console.log(value);
    this.context.message = value;
    const ref = this.view.createEmbeddedView(this.template, this.context);
    console.log(ref);
  }

  constructor(
    el: ElementRef,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {
    console.log(el.nativeElement);
  }
}

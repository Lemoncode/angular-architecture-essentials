import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor][myForOf]',
})
export class MyForDirective {
  @Input()
  set myForOf(collection: any[]) {
    console.log(collection);
    this.view.clear();
    collection.forEach((item) => {
      this.view.createEmbeddedView(this.template, { $implicit: item });
    });
  }

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}
}

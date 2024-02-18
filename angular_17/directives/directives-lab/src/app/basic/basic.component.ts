import { AfterViewInit, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [],
  template: ` <ng-template #foo> This is content inside a template </ng-template> `,
  styles: ``,
})
export class BasicComponent implements AfterViewInit {
  @ViewChild('foo') template!: any;

  constructor(private view: ViewContainerRef) {}
  
  ngAfterViewInit(): void {
    this.view.createEmbeddedView(this.template);
  }
}

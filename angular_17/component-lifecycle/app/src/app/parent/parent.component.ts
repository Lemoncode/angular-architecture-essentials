import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [forwardRef(() => ChildComponent)],
  template: `
    <span>{{ name }}</span>
    <app-child [text]="text"></app-child>
  `,
  styles: ``,
})
export class ParentComponent implements AfterViewInit {
  name = 'I am Parent component';
  text = 'A message for child component';

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
